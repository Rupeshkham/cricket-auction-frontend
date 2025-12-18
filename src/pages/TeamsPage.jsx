import { Box, Button, Typography, Table, TableRow, TableCell } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import TeamForm from "../components/TeamForm";
import ConfirmDialog from "../components/ConfirmDialog";
import LoginModal from "../auth/LoginModal";
import { useAuth } from "../context/AuthContext";

export default function TeamsPage() {
  const { token } = useAuth();
  const [teams, setTeams] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editTeam, setEditTeam] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);

  const fetchTeams = async () => {
    const res = await api.get("/teams");
    setTeams(res.data);
  };
  useEffect(() => {
    fetchTeams();
  }, []);

  const handleAuthAction = (action) => {
    if (!token) {
      setLoginOpen(true);
      return;
    }
    action();
  };

  const saveTeam = async (data) => {
    handleAuthAction(async () => {
      if (editTeam) {
        await api.put(`/teams/${editTeam._id}`, data);
      } else {
        await api.post("/teams/create", data);
      }
      setOpenForm(false);
      setEditTeam(null);
      fetchTeams();
    });
  };

  const confirmDelete = async () => {
    handleAuthAction(async () => {
      await api.delete(`/teams/${deleteId}`);
      setDeleteId(null);
      fetchTeams();
    });
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5">Teams</Typography>
        <Button
          variant="contained"
          onClick={() =>
            handleAuthAction(() => {
              setEditTeam(null);
              setOpenForm(true);
            })
          }
        >
          + Add
        </Button>
      </Box>

      <Table>
        {teams.map((t) => (
          <TableRow key={t._id}>
            <TableCell>{t.name}</TableCell>
            <TableCell>{t.owner}</TableCell>
            <TableCell>{t.pointsLeft}</TableCell>
            <TableCell>
              <Button
                onClick={() =>
                  handleAuthAction(() => {
                    setEditTeam(t);
                    setOpenForm(true);
                  })
                }
              >
                Edit
              </Button>

              <Button
                color="error"
                onClick={() =>
                  handleAuthAction(() => setDeleteId(t._id))
                }
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </Table>

      <TeamForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={saveTeam}
        data={editTeam}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Team?"
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </Box>
  );
}
