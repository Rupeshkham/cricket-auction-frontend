import {
  Dialog,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Divider,
} from "@mui/material";

export default function BidModal({
  open,
  onClose,
  player,
  teams,
  bidData,
  setBidData,
  onSubmit,
}) {
  if (!player) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box>
        {/* 🔹 FULL SIZE IMAGE */}
        <Box
  sx={{
    width: "100%",
    height: 350,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "#000",
  }}
>
  <img
    src={player.image}
    alt={player.name}
    style={{
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "contain", // ✅ FULL IMAGE, NO CUT
    }}
  />
</Box>


        {/* 🔹 CONTENT */}
        <Box p={3}>
          {/* Name & Role */}
          <Typography variant="h6" fontWeight="bold">
            {player.name}
          </Typography>
          <Typography color="text.secondary" mb={2}>
            {player.role}
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {/* 🔹 BID FORM */}
          <Box
            component="form"
            onSubmit={onSubmit}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <TextField
              select
              label="Select Team"
              value={bidData.teamId}
              onChange={(e) =>
                setBidData({ ...bidData, teamId: e.target.value })
              }
              fullWidth
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
              type="number"
              value={bidData.price}
              onChange={(e) =>
                setBidData({ ...bidData, price: e.target.value })
              }
              required
            />

            {/* 🔹 BUTTONS */}
            <Box display="flex" justifyContent="flex-end" gap={2} mt={1}>
              <Button onClick={onClose} variant="outlined">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="success">
                Submit Bid
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}
