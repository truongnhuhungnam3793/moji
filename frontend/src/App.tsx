import { BrowserRouter, Route, Routes } from "react-router"
import ChatApp from "./pages/ChatApp"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import { Toaster } from "sonner"

function App() {
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<ChatApp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
