import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

const PlayerCard = ({ player, onSelect, isSold }) => {
  return (
    <Card
      sx={{
        position: "relative",
        opacity: isSold ? 0.5 : 1,
        cursor: isSold ? "not-allowed" : "pointer",
        transition: "0.3s",
        "&:hover": { transform: isSold ? "none" : "scale(1.03)" },
      }}
      onClick={() => !isSold && onSelect(player)}
    >
      <CardMedia
        component="img"
        height="140"
        image={`${player.image}`}
        alt={player.name}
        sx={{ objectFit: "cover" }}
      />

      {/* SOLD OUT overlay */}
      {isSold && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
            borderRadius: 1,
          }}
        >
          SOLD OUT
        </Box>
      )}

      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold">
          {player.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {player.role}
        </Typography>
                  <Typography variant="body2" color="primary">Base: {player.basePoints} pts</Typography>

      </CardContent>
    </Card>
  );
};

export default PlayerCard;
