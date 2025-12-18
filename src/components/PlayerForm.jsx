import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";
import { useEffect, useState } from "react";

export default function PlayerForm({ open, onClose, onSubmit, data }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [basePoints, setBasePoints] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setRole(data.role);
      setBasePoints(data.basePoints);
    } else {
      setName("");
      setRole("");
      setBasePoints("");
      setImage(null);
    }
  }, [data]);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    formData.append("basePoints", basePoints);
    if (image) formData.append("image", image);

    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{data ? "Edit Player" : "Add Player"}</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label="Player Name"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          fullWidth
          label="Role"
          margin="normal"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <TextField
          fullWidth
          type="number"
          label="Base Points"
          margin="normal"
          value={basePoints}
          onChange={(e) => setBasePoints(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ marginTop: 15 }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {data ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
