import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  MenuItem,
  Paper,
  Divider,
} from "@mui/material";
import api from "../api/axiosConfig";
import PlayerCard from "../components/PlayerCard";
import TeamCard from "../components/TeamCard";

const HomePage = () => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [bidData, setBidData] = useState({ teamId: "", price: "" });
  console.log("players", players);
  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const playerRes = await api.get("/players");
    const teamRes = await api.get("/teams");
    setPlayers(playerRes.data);
    setTeams(teamRes.data);
  };

 const handleBid = async (e) => {
  e.preventDefault();
  if (!selectedPlayer || !bidData.teamId || !bidData.price) {
    alert("Select player, team, and enter price!");
    return;
  }

  try {
    const res = await api.post("/players/auction", {
      playerId: selectedPlayer._id,
      teamId: bidData.teamId,
      price: Number(bidData.price),
    });

    alert(res.data.message);

    // Update teams with remaining points
    const updatedTeam = res.data.updatedTeam;
    setTeams((prev) =>
      prev.map((t) => (t._id === updatedTeam._id ? updatedTeam : t))
    );

    // Update players (mark as sold)
    const updatedPlayer = res.data.player;
    setPlayers((prev) =>
      prev.map((p) => (p._id === updatedPlayer._id ? updatedPlayer : p))
    );

    setBidData({ teamId: "", price: "" });
    setSelectedPlayer(null);
  } catch (err) {
    console.error("Auction Error:", err);
    alert(err.response?.data?.message || "Auction failed!");
  }
};



  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      {/* 🧑‍🤝‍🧑 Team List Section */}
      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
          Teams Overview
        </Typography>
        <Grid container spacing={0}>
          {teams.map((team) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={team._id}>
              <TeamCard team={team} />
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Divider sx={{ mb: 3 }} />

      {/* 🏏 Player List Section */}
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Available Players
      </Typography>
      {/* <Grid container spacing={2}>
        {players.map((p) => (
          <Grid item key={p._id} xs={6} sm={4} md={2}>
            <PlayerCard player={p} onSelect={setSelectedPlayer} />
          </Grid>
        ))}
      </Grid> */}
      <Grid container spacing={2}>
  {players.map((p) => (
    <Grid item key={p._id} xs={6} sm={4} md={2}>
      <PlayerCard
        player={p}
        onSelect={setSelectedPlayer}
        isSold={!!p.soldTo} // ✅ sold players will be dimmed
      />
    </Grid>
  ))}
</Grid>


      {/* 💰 Bidding Section */}
      {selectedPlayer && (
        <Paper elevation={3} sx={{ mt: 5, p: 3 }}>
          <Typography variant="h6" gutterBottom color="primary">
            Bidding for {selectedPlayer.name}
          </Typography>
          <Box component="form" onSubmit={handleBid} display="flex" flexWrap="wrap" gap={2}>
            <TextField
              select
              label="Select Team"
              name="teamId"
              value={bidData.teamId}
              onChange={(e) => setBidData({ ...bidData, teamId: e.target.value })}
              sx={{ width: 250 }}
              required
            >
              {teams.map((t) => (
                <MenuItem key={t._id} value={t._id}>
                  {t.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Bid Points"
              name="price"
              type="number"
              value={bidData.price}
              onChange={(e) => setBidData({ ...bidData, price: e.target.value })}
              sx={{ width: 200 }}
              required
            />
            <Button type="submit" variant="contained" color="success">
              Submit Bid
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setSelectedPlayer(null)}
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      )}

      {/* 🏆 Sold Players Section */}
      <Box sx={{ mt: 6 }}>
  <Typography variant="h5" gutterBottom fontWeight="bold">
    Team-Wise Sold Players
  </Typography>

  {teams.map((t) => (
    <Paper key={t._id} sx={{ mt: 3, p: 3 }} elevation={2}>
      <Typography variant="h6" sx={{ color: "#1976d2", mb: 2 }}>
        {t.name}
      </Typography>

      <Grid container>
        {players
          .filter((p) => p.soldTo && p.soldTo._id === t._id) // ✅ check nested ID
          .map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p._id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 1,
                  m:1,
                  p: 1,
                  borderRadius: 2,
                  bgcolor: "#f5f5f5",
                }}
              >
                <img
                  src={`${p.image}`}
                  alt={p.name}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    marginRight: 10,
                    objectFit: "cover",
                  }}
                />
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    {p.name} — {p.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sold for {p.price} pts to {p.soldTo.name}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
      </Grid>

      {players.filter((p) => p.soldTo && p.soldTo._id === t._id).length === 0 && (
        <Typography sx={{ color: "gray", mt: 2, ml: 1 }}>
          No players sold yet.
        </Typography>
      )}
    </Paper>
  ))}
</Box>

    </Container>
  );
};

export default HomePage;
