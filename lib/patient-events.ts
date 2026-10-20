type PatientRegisteredEvent = {
  patientId: string;
  doctorId: string | null;
};

type Listener = (event: PatientRegisteredEvent) => void;

const globalForPatientEvents = globalThis as typeof globalThis & {
  patientListeners?: Set<Listener>;
};

const listeners =
  (globalForPatientEvents.patientListeners ??= new Set<Listener>());

export function subscribeToPatientEvents(listener: Listener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function publishPatientRegistered(event: PatientRegisteredEvent) {
  listeners.forEach((listener) => listener(event));
}