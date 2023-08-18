import { useEffect, useContext } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../index';
import { Context } from '../Context'

const provider = new GoogleAuthProvider();

// provider.setCustomParameters({
//   redirect_uri: 'https://elvishernandez-didactic-carnival-x5jgw56wqqwf9pvj-9099.preview.app.github.dev/'
// })

export default function Home() {

  const { setUser } = useContext(Context);

  useEffect(() => {

    (async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_FIREBASE_FUNCTIONS_HOST}/geeks-final-project/us-central1/helloWorld`);
        const text = await res.text();

        console.log(text);

      }
      catch (e) {
        console.error(e);
      }
    })();
  }, []);
  return (
    <div className="App">
      <button onClick={(e) => {
        signInWithPopup(auth, provider)
          .then(async (result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log('token: ', token);
            console.log('user: ', user);

            const res = await fetch(`${process.env.REACT_APP_FIREBASE_FUNCTIONS_HOST}/geeks-final-project/us-central1/signUpOrSigninUser`, {
              method: 'post',
              body: JSON.stringify({ email: user.email }),
              headers: {
                'Content-Type': 'application/json'
              }
            });

            const dbUser = await res.json();

            console.log('data: ', dbUser);
            // setUser(dbUser.data);
            // IdP data available using getAdditionalUserInfo(result)
            // ...
          }).catch((error) => {
            console.error(error);
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
      }}>Sign in</button>

      <button onClick={() => auth.signOut()}>Sign out</button>
    </div>
  );
}
