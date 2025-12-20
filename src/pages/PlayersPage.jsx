import {
  Box,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import PlayerForm from "../components/PlayerForm";
import ConfirmDialog from "../components/ConfirmDialog";
import LoginModal from "../auth/LoginModal";
import { useAuth } from "../context/AuthContext";

export default function PlayersPage() {
  const { token } = useAuth();

  const [players, setPlayers] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editPlayer, setEditPlayer] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);

  // Fetch Players
  const fetchPlayers = async () => {
    const res = await api.get("/players");
    setPlayers(res.data);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  // Login check
  const requireLogin = () => {
    if (!token) {
      setLoginOpen(true);
      return false;
    }
    return true;
  };

  // Add / Update Player
  const savePlayer = async (formData) => {
    if (!requireLogin()) return;

    if (editPlayer) {
      await api.put(`/players/${editPlayer._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      await api.post("/players/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    setOpenForm(false);
    setEditPlayer(null);
    fetchPlayers();
  };

  // Delete Player
  const deletePlayer = async () => {
    await api.delete(`/players/${deleteId}`);
    setDeleteId(null);
    fetchPlayers();
  };

  return (
    <Box p={3}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Players</Typography>
        <Button
          variant="contained"
          onClick={() => requireLogin() && setOpenForm(true)}
        >
          + Add Player
        </Button>
      </Box>

      {/* Table */}
      <Table>
        <TableHead>
          <TableRow>
                  <TableCell>Sr No</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Base Points</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {players.map((p) => (
            <TableRow key={p._id}>
                      <TableCell>{index + 1}</TableCell>
              <TableCell>
                <img
                  src={p.image}
                  alt={p.name}
                  width="50"
                  style={{ borderRadius: 6 }}
                />
              </TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.role}</TableCell>
              <TableCell>{p.basePoints}</TableCell>
              <TableCell>
                <Button
                  size="small"
                  onClick={() =>
                    requireLogin() &&
                    (setEditPlayer(p), setOpenForm(true))
                  }
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => requireLogin() && setDeleteId(p._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Popups */}
      <PlayerForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditPlayer(null);
        }}
        onSubmit={savePlayer}
        data={editPlayer}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Delete this player?"
        onClose={() => setDeleteId(null)}
        onConfirm={deletePlayer}
      />

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </Box>
  );
}
