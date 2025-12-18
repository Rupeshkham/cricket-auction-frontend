import { Dialog, TextField, Button, Box } from "@mui/material";
import { useState, useEffect } from "react";

export default function TeamForm({ open, onClose, onSubmit, data }) {
  const [form, setForm] = useState({
    name: "",
    owner: "",
    pointsLeft: 100,
  });

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name || "",
        owner: data.owner || "",
        pointsLeft: data.pointsLeft ?? 100,
      });
    } else {
      setForm({ name: "", owner: "", pointsLeft: 100 });
    }
  }, [data]);

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box p={3} width={350}>
        <TextField
          label="Team Name"
          fullWidth
          margin="normal"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <TextField
          label="Owner"
          fullWidth
          margin="normal"
          value={form.owner}
          onChange={(e) => setForm({ ...form, owner: e.target.value })}
        />

        <TextField
          label="Points Left"
          type="number"
          fullWidth
          margin="normal"
          value={form.pointsLeft}
          onChange={(e) =>
            setForm({ ...form, pointsLeft: Number(e.target.value) })
          }
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </Box>
    </Dialog>
  );
}
