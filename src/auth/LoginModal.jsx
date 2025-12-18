import { Modal, Box, TextField, Button } from "@mui/material";
import axios from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function LoginModal({ open, onClose }) {
  const { login } = useAuth();
  const [data, setData] = useState({ email: "", password: "" });

  const submit = async () => {
    const res = await axios.post("/admin/login", data);
    login(res.data.token);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 3, bgcolor: "white", width: 350, m: "auto", mt: 15 }}>
        <TextField fullWidth margin="normal" label="Email" onChange={e => setData({...data,email:e.target.value})}/>
        <TextField fullWidth margin="normal" label="Password" type="password"
          onChange={e => setData({...data,password:e.target.value})}/>
        <Button fullWidth sx={{ mt: 2 }} onClick={submit}>Login</Button>
      </Box>
    </Modal>
  );
}
