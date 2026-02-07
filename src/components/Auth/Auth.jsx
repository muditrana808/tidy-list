import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../../services/firebase";

function Auth({ user }) {
  const provider = new GoogleAuthProvider();

  async function login() {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  }

  async function logout() {
    await signOut(auth);
  }

  return (
    <div>
      {user ? (
        <>
          <p>Logged in as {user.email}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={login}>Login with Google</button>
      )}
    </div>
  );
}

export default Auth;
