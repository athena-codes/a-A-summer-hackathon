import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDecks } from "../../store/decks";
import { useParams } from "react-router-dom";
import { Container, Box, Typography, Button, Grid } from "@mui/material";
import { addQuestions } from "../../store/questions";
import { useHistory } from "react-router-dom";

function DeckPage() {
  const dispatch = useDispatch();
  const { decks } = useSelector((state) => state.decks);
  const user = useSelector((state) => state.session.user);
  const history = useHistory();

  const { topicId } = useParams();

  const handleGenerateQuestions = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        addQuestions(topicId, user.native_language, user.level, user.uid)
      );
      window.location.reload();
    } catch (error) {
      console.log("Error generating questions:", error.message);
    }
  };

  useEffect(() => {
    if (user && topicId) {
      dispatch(fetchDecks(user.uid, topicId)); // Fetch decks with userId and topicId
    }
  }, [dispatch, user, topicId]);

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <h1>Select Your Language</h1>
      <Container>
        {/* Display decks here */}
        {decks && decks.length > 0 ? (
          <Grid container spacing={2}>
            {decks.map((deck, index) => (
              <Grid item key={deck.id} xs={12} sm={6} md={4}>
                <Box
                  border={1}
                  borderColor="grey.400"
                  padding={2}
                  borderRadius={2}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Typography variant="h6">{`Deck #${index + 1}`}</Typography>
                  <Typography variant="body1">{deck.deckName}</Typography> {/* Update with your deck field */}
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>No decks available</Typography>
        )}
      </Container>
      <Container>
        <Button color="divider" onClick={handleGenerateQuestions} fullWidth variant="outlined">Add New Deck</Button>
      </Container>
    </Box>
  );
}

export default DeckPage;
