import PasswordResetTool from "@/components/PasswordResetTool";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Paneli</h1>
      <PasswordResetTool />
    </div>
  );
}