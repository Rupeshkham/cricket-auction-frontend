import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  MenuItem,
  Box,
} from "@mui/material";
import axios from "axios";

const roles = ["Batsman", "Bowler", "All-Rounder", "Wicket-Keeper"];

const AddTeamPlayerPage = () => {
  const [team, setTeam] = useState({ name: "", owner: "", pointsLeft: 100 });
  const [player, setPlayer] = useState({ name: "", role: "", basePoints: 3 });
  const [image, setImage] = useState(null);

  const handleTeamChange = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value });
  };

  const handlePlayerChange = (e) => {
    setPlayer({ ...player, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // --- Add Team ---
  const handleAddTeam = async () => {
    try {
      const res = await axios.post("https://cricket-auction-backend-647r.onrender.com/api/teams/create", team);
      alert("✅ Team added successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Error adding team");
    }
  };

  // --- Add Player ---
  const handleAddPlayer = async () => {
    try {
      const formData = new FormData();
      formData.append("name", player.name);
      formData.append("role", player.role);
      formData.append("basePoints", player.basePoints);
      formData.append("image", image);

      const res = await axios.post("https://cricket-auction-backend-647r.onrender.com/api/players/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Player added successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Error adding player");
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        py: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 4,
        flexWrap: "wrap", // ✅ keeps responsive on smaller screens
      }}
    >
      {/* --- Add Team --- */}
      <Card sx={{ width: "45%", boxShadow: 4, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            ➕ Add Team
          </Typography>
          <TextField
            label="Team Name"
            name="name"
            fullWidth
            margin="normal"
            value={team.name}
            onChange={handleTeamChange}
          />
          <TextField
            label="Owner Name"
            name="owner"
            fullWidth
            margin="normal"
            value={team.owner}
            onChange={handleTeamChange}
          />
          <TextField
            label="Points Left"
            name="pointsLeft"
            type="number"
            fullWidth
            margin="normal"
            value={team.pointsLeft}
            onChange={handleTeamChange}
          />
          <Box textAlign="center" mt={2}>
            <Button variant="contained" color="primary" onClick={handleAddTeam}>
              Add Team
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* --- Add Player --- */}
      <Card sx={{ width: "45%", boxShadow: 4, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="secondary">
            🧑‍🎓 Add Player
          </Typography>
          <TextField
            label="Player Name"
            name="name"
            fullWidth
            margin="normal"
            value={player.name}
            onChange={handlePlayerChange}
          />
          <TextField
            select
            label="Role"
            name="role"
            fullWidth
            margin="normal"
            value={player.role}
            onChange={handlePlayerChange}
          >
            {roles.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Base Points"
            name="basePoints"
            type="number"
            fullWidth
            margin="normal"
            value={player.basePoints}
            onChange={handlePlayerChange}
          />
          <Button variant="outlined" component="label" sx={{ mt: 2 }}>
            Upload Image
            <input type="file" hidden onChange={handleImageChange} />
          </Button>
          {image && (
            <Typography variant="body2" mt={1}>
              Selected: {image.name}
            </Typography>
          )}
          <Box textAlign="center" mt={3}>
            <Button variant="contained" color="secondary" onClick={handleAddPlayer}>
              Add Player
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddTeamPlayerPage;
