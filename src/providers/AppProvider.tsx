import { GoogleOAuthProvider } from "@react-oauth/google";

interface  AppProviderProps{
  children: React.ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
}

export default AppProvider;