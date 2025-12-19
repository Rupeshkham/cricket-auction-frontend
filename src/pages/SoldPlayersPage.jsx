import {
  Box,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import ConfirmDialog from "../components/ConfirmDialog";
import LoginModal from "../auth/LoginModal";
import SoldPlayerForm from "../components/SoldPlayerForm";
import { useAuth } from "../context/AuthContext";

export default function SoldPlayersPage() {
  const { token } = useAuth();

  const [players, setPlayers] = useState([]);
  const [editPlayer, setEditPlayer] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);

  // 🔹 Fetch only sold players
  const fetchSoldPlayers = async () => {
    const res = await api.get("/players");
    const sold = res.data.filter((p) => p.soldTo);
    setPlayers(sold);
  };

  useEffect(() => {
    fetchSoldPlayers();
  }, []);

  // 🔐 Login check
  const requireLogin = () => {
    if (!token) {
      setLoginOpen(true);
      return false;
    }
    return true;
  };

  // ✏️ Update sold player
  const updateSoldPlayer = async (data) => {
    if (!requireLogin()) return;

    await api.put(
      `/players/update-sold/${editPlayer._id}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setEditPlayer(null);
    fetchSoldPlayers();
  };

  // ❌ Unsold / delete
  const deleteSoldPlayer = async () => {
    await api.delete(`/players/unsold/${deleteId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setDeleteId(null);
    fetchSoldPlayers();
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Sold Players
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {players.map((p) => (
            <TableRow key={p._id}>
              <TableCell>
                <img
                  src={p.image}
                  alt={p.name}
                  width={50}
                  style={{ borderRadius: 6 }}
                />
              </TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.role}</TableCell>
              <TableCell>{p.soldTo?.name}</TableCell>
              <TableCell>{p.price}</TableCell>
              <TableCell>
                <Button
                  size="small"
                  onClick={() =>
                    requireLogin() && setEditPlayer(p)
                  }
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() =>
                    requireLogin() && setDeleteId(p._id)
                  }
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* ✏️ Edit Modal */}
      <SoldPlayerForm
        open={!!editPlayer}
        data={editPlayer}
        onClose={() => setEditPlayer(null)}
        onSubmit={updateSoldPlayer}
      />

      {/* ❌ Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteId}
        title="Remove this sold player?"
        onClose={() => setDeleteId(null)}
        onConfirm={deleteSoldPlayer}
      />

      {/* 🔐 Login */}
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </Box>
  );
}
