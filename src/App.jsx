import { Inscription } from "../Components/Inscription"
import { Discussion } from "../Components/Discussion"
import { Profil } from "../Components/Profil"
import { Connexion } from "../Components/Connexion"


function App() {

  return (
    <>
      {/* <div className="mx-auto max-w-lg border-collapse bg-zinc-100 p-4">
        <p>coucou</p>
      </div> */}
      < Inscription />
      < Discussion />
      < Profil />
      < Connexion />
    </>
  )
}

export default App
