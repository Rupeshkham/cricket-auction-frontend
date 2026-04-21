import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Divider,
} from "@mui/material";

import api from "../api/axiosConfig";
import PlayerCard from "../components/PlayerCard";
import TeamCard from "../components/TeamCard";
import LoginModal from "../auth/LoginModal";
import BidModal from "../components/BidModal";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { token, loginOpen, setLoginOpen } = useAuth();
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [bidData, setBidData] = useState({ teamId: "", price: "" });

  const [bidOpen, setBidOpen] = useState(false);

  // 🔹 Fetch Players & Teams
  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const playerRes = await api.get("/players");
    const teamRes = await api.get("/teams");
    setPlayers(playerRes.data);
    setTeams(teamRes.data);
  };

  // 🔐 Player click → Auth check
  const handlePlayerClick = (player) => {
    if (player.soldTo) return; // ❌ sold player disable

    if (!token) {
      setSelectedPlayer(player);
      setLoginOpen(true);
      return;
    }

    setSelectedPlayer(player);
    setBidOpen(true);
  };

  // 💰 Submit Bid
  const handleBid = async (e) => {
    e.preventDefault();

    if (!selectedPlayer || !bidData.teamId || !bidData.price) {
      alert("Select team and enter bid amount");
      return;
    }

    try {
      const res = await api.post("/players/auction", {
        playerId: selectedPlayer._id,
        teamId: bidData.teamId,
        price: Number(bidData.price),
      });

      alert(res.data.message);

      // Update players
      setPlayers((prev) =>
        prev.map((p) => (p._id === res.data.player._id ? res.data.player : p)),
      );

      // Update teams
      setTeams((prev) =>
        prev.map((t) =>
          t._id === res.data.updatedTeam._id ? res.data.updatedTeam : t,
        ),
      );

      closeBidModal();
    } catch (err) {
      alert(err.response?.data?.message || "Auction failed!");
    }
  };

  const closeBidModal = () => {
    setBidOpen(false);
    setSelectedPlayer(null);
    setBidData({ teamId: "", price: "" });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      {/* ================== TEAMS ================== */}
      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
          Teams Overview
        </Typography>

        <Grid container>
          {teams.map((team) => (
            <Grid key={team._id} item xs={12} sm={6} md={4} lg={2}>
              <TeamCard team={team} />
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Divider sx={{ mb: 3 }} />

      {/* ================== PLAYERS ================== */}
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Available Players
      </Typography>

      <Grid container spacing={2}>
        {players.map((p) => (
          <Grid key={p._id} item xs={6} sm={4} md={2}>
            <PlayerCard
              player={p}
              isSold={!!p.soldTo}
              onSelect={() => handlePlayerClick(p)}
            />
          </Grid>
        ))}
      </Grid>

      {/* ================== SOLD PLAYERS ================== */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Team-Wise Sold Players
        </Typography>

        {teams.map((t) => (
          <Paper key={t._id} sx={{ mt: 3, p: 3 }}>
            <Typography variant="h6" color="primary">
              {t.name}
            </Typography>

            <Grid container>
              {players
                .filter((p) => p.soldTo?._id === t._id)
                .map((p) => (
                  <Grid item xs={12} sm={6} md={4} key={p._id}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                        p: 1,
                        bgcolor: "#f5f5f5",
                        borderRadius: 2,
                      }}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          marginRight: 10,
                        }}
                      />
                      <Box>
                        <Typography fontWeight="bold">{p.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Sold for {p.price} pts
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
            </Grid>

            {players.filter((p) => p.soldTo?._id === t._id).length === 0 && (
              <Typography color="gray" mt={2}>
                No players sold yet
              </Typography>
            )}
          </Paper>
        ))}
      </Box>

      {/* ================== BID MODAL ================== */}
      <BidModal
        open={bidOpen}
        onClose={closeBidModal}
        player={selectedPlayer}
        teams={teams}
        bidData={bidData}
        setBidData={setBidData}
        onSubmit={handleBid}
      />

      {/* ================== LOGIN MODAL ================== */}
      <LoginModal
        open={loginOpen}
        onClose={() => {
          setLoginOpen(false);
          if (selectedPlayer) setBidOpen(true);
        }}
      />
    </Container>
  );
};

export default HomePage;
