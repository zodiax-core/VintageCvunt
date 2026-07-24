import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { CustomerLayout } from "@/components/CustomerLayout";
import { useAuthContext } from "@/lib/auth-context";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/settings")({
  beforeLoad: () => import("@/lib/auth-guard").then((m) => m.requireCustomer()),
  component: AccountSettings,
  head: () => ({
    meta: [
      { title: "Account Settings — VintageCvunt" },
    ],
  }),
});

const EASE = [0.16, 1, 0.3, 1] as const;

function AccountSettings() {
  const { user, updateUser } = useAuthContext();
  const customer = useQuery(api.customers.getByEmail, { email: user?.email || "" });
  const updateProfile = useMutation(api.customers.updateProfile);
  const updatePassword = useMutation(api.customers.updatePassword);

  const [profile, setProfile] = useState({ name: user?.name || "", phone: "", address: "" });
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [profileMsg, setProfileMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer) return;
    setProfileLoading(true);
    setProfileMsg("");
    try {
      await updateProfile({
        id: customer._id,
        name: profile.name.trim() || undefined,
        phone: profile.phone.trim() || undefined,
        address: profile.address.trim() || undefined,
      });
      if (profile.name.trim()) {
        updateUser({ name: profile.name.trim() });
      }
      setProfileMsg("Profile updated successfully.");
    } catch (err: any) {
      setProfileMsg(err.message || "Failed to update profile.");
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer) return;
    if (passwords.new !== passwords.confirm) {
      setPasswordMsg("New passwords do not match.");
      return;
    }
    if (passwords.new.length < 8) {
      setPasswordMsg("New password must be at least 8 characters.");
      return;
    }
    setPasswordLoading(true);
    setPasswordMsg("");
    try {
      await updatePassword({
        id: customer._id,
        currentPassword: passwords.current,
        newPassword: passwords.new,
      });
      setPasswords({ current: "", new: "", confirm: "" });
      setPasswordMsg("Password changed successfully.");
    } catch (err: any) {
      setPasswordMsg(err.message || "Failed to change password.");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <CustomerLayout>
      <div className="mb-8 border-b border-chrome/10 pb-4">
        <h2 className="text-lg font-mono uppercase tracking-[0.2em] text-foreground">Account Settings</h2>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mt-2">
          Manage your profile and security
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-6">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mb-6">Profile Details</h2>
          <form onSubmit={handleProfileSubmit} className="space-y-5">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2">Full Name</label>
              <input
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full rounded-xl border border-chrome/20 bg-background px-4 py-3 font-mono text-sm text-foreground placeholder:text-chrome-dim/30 outline-none focus:border-chrome/50 transition-colors"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2">Email</label>
              <input
                value={user?.email || ""}
                disabled
                className="w-full rounded-xl border border-chrome/10 bg-chrome/5 px-4 py-3 font-mono text-sm text-chrome-dim/60 outline-none cursor-not-allowed"
              />
              <p className="mt-1 font-mono text-[9px] text-chrome-dim/40">Email cannot be changed.</p>
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2">Phone</label>
              <input
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                placeholder="+92 300 1234567"
                className="w-full rounded-xl border border-chrome/20 bg-background px-4 py-3 font-mono text-sm text-foreground placeholder:text-chrome-dim/30 outline-none focus:border-chrome/50 transition-colors"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2">Address</label>
              <textarea
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                rows={2}
                className="w-full rounded-xl border border-chrome/20 bg-background px-4 py-3 font-mono text-sm text-foreground placeholder:text-chrome-dim/30 outline-none focus:border-chrome/50 transition-colors resize-none"
              />
            </div>
            <button type="submit" disabled={profileLoading} className="btn-chrome btn-chrome-inner w-full justify-center disabled:opacity-50">
              <Save size={14} />
              <span className="btn-label">{profileLoading ? "Saving…" : "Save Changes"}</span>
            </button>
            {profileMsg && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`font-mono text-[10px] ${profileMsg.includes("success") ? "text-green-400" : "text-red-400"}`}
              >
                {profileMsg}
              </motion.p>
            )}
          </form>
        </div>

        <div className="bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-6">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mb-6">Change Password</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-5">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2">Current Password</label>
              <input
                type="password"
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                className="w-full rounded-xl border border-chrome/20 bg-background px-4 py-3 font-mono text-sm text-foreground placeholder:text-chrome-dim/30 outline-none focus:border-chrome/50 transition-colors"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2">New Password</label>
              <input
                type="password"
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                className="w-full rounded-xl border border-chrome/20 bg-background px-4 py-3 font-mono text-sm text-foreground placeholder:text-chrome-dim/30 outline-none focus:border-chrome/50 transition-colors"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim mb-2">Confirm New Password</label>
              <input
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                className="w-full rounded-xl border border-chrome/20 bg-background px-4 py-3 font-mono text-sm text-foreground placeholder:text-chrome-dim/30 outline-none focus:border-chrome/50 transition-colors"
              />
            </div>
            <button type="submit" disabled={passwordLoading} className="btn-chrome btn-chrome-inner w-full justify-center disabled:opacity-50">
              <Save size={14} />
              <span className="btn-label">{passwordLoading ? "Changing…" : "Update Password"}</span>
            </button>
            {passwordMsg && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`font-mono text-[10px] ${passwordMsg.includes("success") ? "text-green-400" : "text-red-400"}`}
              >
                {passwordMsg}
              </motion.p>
            )}
          </form>
        </div>
      </div>
    </CustomerLayout>
  );
}
