"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  ShieldCheck,
  CalendarDays,
  Pencil,
  Check,
  X,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function ProfilePage() {
  const {
    data: session,
    isPending,
    error,
    refetch,
  } = authClient.useSession();

  // -----------------------------
  // Edit states
  // -----------------------------
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  // -----------------------------
  // Input states
  // -----------------------------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneInput, setPhoneInput] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // -----------------------------
  // Common state
  // -----------------------------
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // -----------------------------
  // Loading
  // -----------------------------
  if (isPending) {
    return (
      <main className="min-h-screen bg-blue-600 px-6 py-10">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8">
          Loading profile...
        </div>
      </main>
    );
  }

  // -----------------------------
  // Error / Not logged in
  // -----------------------------
  if (error || !session?.user) {
    return (
      <main className="min-h-screen bg-blue-600 px-6 py-10">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8">
          <h1 className="text-xl font-semibold">
            Unable to load profile
          </h1>

          <p className="mt-2 text-gray-500">
            Please sign in again.
          </p>
        </div>
      </main>
    );
  }

  const user = session.user;

  // Temporary type extension for your custom Better Auth field.
  // Ideally, configure phone_no in Better Auth additionalFields
  // so this cast will no longer be necessary.
  type UserWithPhone = typeof user & {
    phone_no?: string;
  };

  const profileUser = user as UserWithPhone;

  // -----------------------------
  // Update Name
  // -----------------------------
  const handleUpdateName = async () => {
    if (!name.trim()) {
      setMessage("Name cannot be empty.");
      return;
    }

    if (name.trim() === user.name) {
      setEditingName(false);
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await authClient.updateUser({
      name: name.trim(),
    });

    setLoading(false);

    if (error) {
      setMessage(error.message || "Failed to update name.");
      return;
    }

    await refetch();

    setEditingName(false);
    setMessage("Name updated successfully.");
  };

  // -----------------------------
  // Change Email
  // -----------------------------
//   const handleUpdateEmail = async () => {
//     if (!email.trim()) {
//       setMessage("Email cannot be empty.");
//       return;
//     }

//     if (email.trim().toLowerCase() === user.email.toLowerCase()) {
//       setEditingEmail(false);
//       return;
//     }

//     setLoading(true);
//     setMessage("");

//     const { error } = await authClient.changeEmail({
//       newEmail: email.trim(),
//       callbackURL: "/profile",
//     });

//     setLoading(false);

//     if (error) {
//       setMessage(error.message || "Failed to change email.");
//       return;
//     }

//     setEditingEmail(false);

//     setMessage(
//       "A verification link has been sent to your new email address."
//     );
//   };

  // -----------------------------
  // Update Phone
  // -----------------------------
  const handleUpdatePhone = async () => {
    const newPhone = phoneInput.trim();

    if (!newPhone) {
      setMessage("Phone number cannot be empty.");
      return;
    }

    if (newPhone === (profileUser.phone_no || "")) {
      setEditingPhone(false);
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await authClient.updateUser({
      phone_no: newPhone,
    });

    setLoading(false);

    if (error) {
      setMessage(
        error.message || "Failed to update phone number."
      );
      return;
    }

    await refetch();

    setEditingPhone(false);
    setMessage("Phone number updated successfully.");
  };

  // -----------------------------
  // Change Password
  // -----------------------------
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("Please fill all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setMessage(
        "Password must contain at least 8 characters."
      );
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await authClient.changePassword({
      currentPassword,
      newPassword,
      revokeOtherSessions: true,
    });

    setLoading(false);

    if (error) {
      setMessage(
        error.message || "Failed to change password."
      );
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setChangingPassword(false);

    setMessage("Password changed successfully.");
  };

  return (
    <main className="min-h-screen bg-blue-600 px-6 py-10">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Profile
          </h1>

          <p className="mt-2 text-blue-100">
            Manage your account information and security.
          </p>
        </div>

        {/* Profile Card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

          {/* Profile Header */}
          <div className="flex items-center gap-5 border-b pb-6">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-blue-100">
              {user.image ? (
                <Image
                  src={user.image}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <User className="h-9 w-9 text-blue-600" />
              )}
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {user.name}
              </h2>

              <p className="text-gray-500">
                {user.email}
              </p>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className="mt-5 rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-700">
              {message}
            </div>
          )}

          {/* Personal Information */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900">
              Personal Information
            </h3>

            <div className="mt-5 space-y-5">

              {/* =========================
                  Name
              ========================= */}
              <div className="rounded-xl border p-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-blue-600" />

                  <div className="flex-1">
                    <p className="text-sm text-gray-500">
                      Full Name
                    </p>

                    {!editingName ? (
                      <p className="mt-1 font-medium text-gray-900">
                        {user.name}
                      </p>
                    ) : (
                      <input
                        type="text"
                        value={name}
                        onChange={(e) =>
                          setName(e.target.value)
                        }
                        className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-600"
                      />
                    )}
                  </div>

                  {!editingName ? (
                    <button
                      type="button"
                      onClick={() => {
                        setName(user.name);
                        setMessage("");
                        setEditingName(true);
                      }}
                      className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={loading}
                        onClick={handleUpdateName}
                        className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
                      >
                        <Check className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        disabled={loading}
                        onClick={() => {
                          setEditingName(false);
                          setName("");
                        }}
                        className="rounded-lg border p-2 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* =========================
                  Email
              ========================= */}
              <div className="rounded-xl border p-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-600" />

                  <div className="flex-1">
                    <p className="text-sm text-gray-500">
                      Email Address
                    </p>

                    {!editingEmail ? (
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <p className="font-medium text-gray-900">
                          {user.email}
                        </p>

                        {user.emailVerified && (
                          <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                            <ShieldCheck className="h-3 w-3" />
                            Verified
                          </span>
                        )}
                      </div>
                    ) : (
                      <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                          setEmail(e.target.value)
                        }
                        className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-600"
                      />
                    )}
                  </div>

                  {/* {!editingEmail ? (
                    <button
                      type="button"
                      onClick={() => {
                        setEmail(user.email);
                        setMessage("");
                        setEditingEmail(true);
                      }}
                      className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={loading}
                        onClick={handleUpdateEmail}
                        className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
                      >
                        <Check className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        disabled={loading}
                        onClick={() => {
                          setEditingEmail(false);
                          setEmail("");
                        }}
                        className="rounded-lg border p-2 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )} */}
                </div>
              </div>

              {/* =========================
                  Phone
              ========================= */}
              <div className="rounded-xl border p-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-600" />

                  <div className="flex-1">
                    <p className="text-sm text-gray-500">
                      Phone Number
                    </p>

                    {!editingPhone ? (
                      <p className="mt-1 font-medium text-gray-900">
                        {profileUser.phone_no || "Not provided"}
                      </p>
                    ) : (
                      <input
                        type="tel"
                        value={phoneInput}
                        onChange={(e) =>
                          setPhoneInput(e.target.value)
                        }
                        placeholder="Enter phone number"
                        className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-600"
                      />
                    )}
                  </div>

                  {!editingPhone ? (
                    <button
                      type="button"
                      onClick={() => {
                        setPhoneInput(
                          profileUser.phone_no || ""
                        );
                        setMessage("");
                        setEditingPhone(true);
                      }}
                      className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={loading}
                        onClick={handleUpdatePhone}
                        className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
                      >
                        <Check className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        disabled={loading}
                        onClick={() => {
                          setEditingPhone(false);
                          setPhoneInput("");
                        }}
                        className="rounded-lg border p-2 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* =========================
                  Account Created
              ========================= */}
              <div className="rounded-xl border p-4">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-blue-600" />

                  <div>
                    <p className="text-sm text-gray-500">
                      Member Since
                    </p>

                    <p className="mt-1 font-medium text-gray-900">
                      {new Date(
                        user.createdAt
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* =========================
              Security
          ========================= */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-gray-900">
              Security
            </h3>

            <div className="mt-5 rounded-xl border p-4">
              <div className="flex items-start gap-3">
                <Lock className="mt-1 h-5 w-5 text-blue-600" />

                <div className="flex-1">
                  <p className="text-sm text-gray-500">
                    Password
                  </p>

                  {!changingPassword ? (
                    <>
                      <p className="mt-1 font-medium">
                        ••••••••••••••••
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          setMessage("");
                          setChangingPassword(true);
                        }}
                        className="mt-3 text-sm font-medium text-blue-600 hover:underline"
                      >
                        Change Password
                      </button>
                    </>
                  ) : (
                    <div className="mt-4 space-y-3">

                      <input
                        type="password"
                        placeholder="Current password"
                        value={currentPassword}
                        onChange={(e) =>
                          setCurrentPassword(e.target.value)
                        }
                        className="w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-600"
                      />

                      <input
                        type="password"
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) =>
                          setNewPassword(e.target.value)
                        }
                        className="w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-600"
                      />

                      <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) =>
                          setConfirmPassword(e.target.value)
                        }
                        className="w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-600"
                      />

                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          disabled={loading}
                          onClick={handleChangePassword}
                          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                          {loading
                            ? "Updating..."
                            : "Update Password"}
                        </button>

                        <button
                          type="button"
                          disabled={loading}
                          onClick={() => {
                            setChangingPassword(false);
                            setCurrentPassword("");
                            setNewPassword("");
                            setConfirmPassword("");
                          }}
                          className="rounded-lg border px-5 py-2.5 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </div>

                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}