import SigninForm from "@/components/auth/signin-form";

const SignIn = () => {
  return (
    <div
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #fff 40%, #7c3aed 100%)",
      }}
      className="bg-muted absolute inset-0 z-0 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10"
    >
      <SigninForm />
    </div>
  );
};
export default SignIn;
