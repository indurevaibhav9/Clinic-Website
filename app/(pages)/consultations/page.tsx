"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  patientId: string;
  doctorId: string;
};

type ConsultationResult = {
  transcript: string;
  summary: string;
  keyPoints: string[];
  followUp: string[];
};

export default function ConsultationRecorder({
  patientId,
  doctorId,
}: Props) {
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [recording, setRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<ConsultationResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (recorderRef.current?.state === "recording") {
        recorderRef.current.stop();
      }
    };
  }, []);

  async function startRecording() {
    try {
      setError("");
      setResult(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        setRecording(false);
        setProcessing(true);

        try {
          const mimeType = recorder.mimeType || "audio/webm";
          const extension = mimeType.includes("mp4") ? "mp4" : "webm";

          const audioBlob = new Blob(chunksRef.current, {
            type: mimeType,
          });

          const formData = new FormData();
          formData.append("audio", audioBlob, `consultation.${extension}`);
          formData.append("doctorId", "671a1234567890abcdef1234");

          const response = await fetch(
            `/api/consultations/${patientId}/record`,
            {
              method: "POST",
              body: formData,
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Failed to process recording.");
          }

          setResult(data.consultation);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Something went wrong."
          );
        } finally {
          stream.getTracks().forEach((track) => track.stop());
          setProcessing(false);
        }
      };

      recorder.start();
      setRecording(true);
    } catch {
      setError(
        "Microphone access failed. Please allow microphone permission and try again."
      );
    }
  }

  function stopRecording() {
    if (recorderRef.current?.state === "recording") {
      recorderRef.current.stop();
    }
  }

  return (
    <section className="space-y-4 rounded-lg border p-4">
      <h2 className="text-lg font-semibold">Consultation recording</h2>

      {!recording ? (
        <button
          type="button"
          onClick={startRecording}
          disabled={processing}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {processing ? "Processing..." : "Record"}
        </button>
      ) : (
        <button
          type="button"
          onClick={stopRecording}
          className="rounded bg-red-600 px-4 py-2 text-white"
        >
          Stop recording
        </button>
      )}

      {processing && (
        <p role="status">
          Transcribing audio and generating consultation notes...
        </p>
      )}

      {error && <p className="text-red-600">{error}</p>}

      {result && (
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold">Transcript</h3>
            <p className="whitespace-pre-wrap">{result.transcript}</p>
          </div>

          <div>
            <h3 className="font-semibold">AI summary — review required</h3>
            <p>{result.summary}</p>
          </div>

          <div>
            <h3 className="font-semibold">Key points</h3>
            <ul className="list-disc pl-6">
              {result.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Follow-up</h3>
            <ul className="list-disc pl-6">
              {result.followUp.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}