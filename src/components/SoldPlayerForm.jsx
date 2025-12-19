import {
  Dialog,
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

export default function SoldPlayerForm({ open, onClose, onSubmit, data }) {
  const [teams, setTeams] = useState([]);
  const [form, setForm] = useState({ teamId: "", price: "" });

  useEffect(() => {
    if (data) {
      setForm({
        teamId: data.soldTo?._id,
        price: data.price,
      });
    }
  }, [data]);

  useEffect(() => {
    api.get("/teams").then((res) => setTeams(res.data));
  }, []);

  if (!data) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box p={3}>
        <Typography variant="h6" mb={2}>
          Edit Sold Player
        </Typography>

        <TextField
          select
          label="Team"
          fullWidth
          margin="normal"
          value={form.teamId}
          onChange={(e) =>
            setForm({ ...form, teamId: e.target.value })
          }
        >
          {teams.map((t) => (
            <MenuItem key={t._id} value={t._id}>
              {t.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Price"
          type="number"
          fullWidth
          margin="normal"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => onSubmit(form)}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
