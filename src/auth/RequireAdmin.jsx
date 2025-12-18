import { useAuth } from "../context/AuthContext";

export default function RequireAdmin({ onFail, children }) {
  const { token } = useAuth();

  if (!token) {
    onFail();
    return null;
  }
  return children;
}
