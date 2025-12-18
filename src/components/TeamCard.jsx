// TeamCard.js
import { Card, CardContent, Typography } from "@mui/material";

const TeamCard = ({ team }) => (
  <Card sx={{ textAlign: "center", p: 1, borderRadius: 3 , m:1}}>
    <CardContent>
      <Typography variant="h6" fontWeight="bold">
        {team.name}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        Owner: {team.owner}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, color: "#2e7d32" }}>
        Remaining Points: <b>{team.pointsLeft}</b>
      </Typography>
    </CardContent>
  </Card>
);

export default TeamCard;
