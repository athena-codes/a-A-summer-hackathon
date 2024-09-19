import {
  Container,
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Grid,
  Card,
  LinearProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  useParams,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneDeck, archiveDeck, updateDeckStatus } from "../store/decks";
import { fetchUserAttempt, modifyUserAttempt } from "../store/attempt";
import Flippy, { FrontSide, BackSide } from "react-flippy";

function CardPage() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { deckId } = useParams();
  const location = useLocation();
  const user = useSelector((state) => state.session.user);
  const deck = useSelector((state) => state.decks.selectedDeck);
  const cards = deck?.cards?.[0]?.questionData?.jsonData || [];
  // const attemptId = useSelector((state) => state.attempt.attemptId);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [flipped, setFlipped] = useState({});
  //const attemptId = useSelector((state) => state.userAttempts);
  const { attemptId } = location.state || {};
  const topicName = deck?.cards?.[0]?.questionData?.topic;
  const topicLevel = deck?.level;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchOneDeck(deckId));

      // Fetch the user's attempt progress (existing answers)
      await dispatch(fetchUserAttempt(deckId));

      setTimeout(() => {
        setLoading(false);
      }, 500);
    };
    fetchData();
  }, [dispatch, deckId, attemptId]);

  // Ensure that after reloading the deck, you check progress
  useEffect(() => {
    const checkIfComplete = () => {
      const allQuestionsAttempted =
        Object.keys(selectedAnswers).length === cards.length;
      if (allQuestionsAttempted) {
        dispatch(archiveDeck(deckId, user.uid));
        console.log("Deck archived upon re-entry");
      }
    };
    checkIfComplete();
  }, [selectedAnswers, cards, deckId, dispatch, user.uid]);

  const handleAnswerChange = async (cardIndex, optionIndex, questionId) => {
    const selectedOption = cards[cardIndex].options[optionIndex];
    try {
      setSelectedAnswers((prevAnswers) => ({
        ...prevAnswers,
        [cardIndex]: optionIndex,
      }));

      const checkAttempt = await dispatch(
        modifyUserAttempt(
          user.uid,
          questionId,
          attemptId,
          selectedOption,
          deckId
        )
      );

      if (checkAttempt && checkAttempt.message === "Answer is correct!") {
        setFeedback((prevFeedback) => ({
          ...prevFeedback,
          [cardIndex]: {
            isCorrect: true,
          },
        }));
      } else if (
        checkAttempt &&
        checkAttempt.message === "Answer is incorrect."
      ) {
        setFeedback((prevFeedback) => ({
          ...prevFeedback,
          [cardIndex]: {
            isCorrect: false,
            correctAnswer: checkAttempt.correctAnswer,
          },
        }));
      }

      // Save the progress after each question is answered
      await dispatch(updateDeckStatus(deckId, attemptId));

      // Check if all questions are answered, and archive the deck
      const allQuestionsAttempted =
        Object.keys(selectedAnswers).length === cards.length;

      if (allQuestionsAttempted) {
        await dispatch(archiveDeck(deckId, user.uid));
        await dispatch(fetchOneDeck(deckId)); // Refresh the deck data
        console.log("Deck archived");
      }
    } catch (error) {
      console.error("Error modifying user attempt:", error);
    }
  };

  const handleFlip = (cardIndex) => {
    if (!flipped[cardIndex]) {
      setFlipped((prevState) => ({
        ...prevState,
        [cardIndex]: true,
      }));
    }
  };

  if (loading) {
    return <LinearProgress />;
  }

  console.log(deck);

  return (
    <Container
      sx={{
        padding: "0 5vw 0 5vw",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 0 }}>{topicName}</h1>
      <h3 style={{ textAlign: "center", marginTop: 0 }}>{topicLevel}</h3>
      {!deck?.archived && (
        <p style={{ textAlign: "center" }}>
          Each card contains four options. Select your answer to see if it's
          correct.
        </p>
      )}
      <Container
        sx={{
          justifyContent: "center",
          minHeight: "100vh",
          p: 2,
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{
            flexWrap: { md: "nowrap" },
          }}
        >
          {cards.map((card, cardIndex) => (
            <React.Fragment key={card.id}>
              {!card.isAttempted ? (
                <Grid item container>
                  <Flippy
                    flipOnHover={false}
                    flipOnClick={false}
                    flipDirection="horizontal"
                    isFlipped={
                      flipped[cardIndex] || feedback[cardIndex] !== undefined
                    }
                    onClick={() => handleFlip(cardIndex)}
                  >
                    <FrontSide
                      style={{
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        display: "flex",
                        justifyContent: "center",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      <Card
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "300px",
                          height: "450px",
                          borderRadius: "3px",
                          border: `1.5px solid ${
                            theme.palette.mode === "light"
                              ? "#160e0e"
                              : "#f1e9e9"
                          }`,
                        }}
                      >
                        <Box
                          sx={{
                            backgroundColor: `${theme.palette.divider.main}`,
                            height: "300px",
                            padding: "20px",
                            overflow: "auto",
                          }}
                        >
                          <h2
                            style={{ margin: "0" }}
                            dangerouslySetInnerHTML={{
                              __html: card.question
                                .split("\n")
                                .map(
                                  (line) =>
                                    `<div style="margin: 0; padding: 0; margin-bottom: 10px;">${line}</div>`
                                )
                                .join(""),
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            backgroundColor: `${theme.palette.background.main}`,
                            height: "150px",
                            padding: "10px 20px",
                            borderTop: `1.5px solid ${
                              theme.palette.mode === "light"
                                ? "#160e0e"
                                : "#f1e9e9"
                            }`,
                            overflow: "auto",
                            display: "flex",
                            alignContent: "center",
                            flexDirection: "column",
                            alignItems: "stretch",
                          }}
                        >
                          <FormControl>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                              sx={{
                                display: "grid",
                                gridAutoFlow: "row",
                                alignItems: "center",
                                height: "fit-content",
                                overflow: "auto",
                                padding: "5px",
                              }}
                              onChange={(e) =>
                                handleAnswerChange(
                                  cardIndex,
                                  parseInt(e.target.value),
                                  card.id
                                )
                              }
                            >
                              {card.options.map((option, optionIndex) => (
                                <FormControlLabel
                                  key={optionIndex}
                                  value={optionIndex}
                                  control={
                                    <Radio
                                      sx={{
                                        color: theme.palette.primary.main,
                                        width: "30px",
                                        height: "30px",
                                        alignSelf: "flex-start",
                                      }}
                                    />
                                  }
                                  label={
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        paddingLeft: "5px",
                                      }}
                                    >
                                      {option}
                                    </Box>
                                  }
                                  sx={{
                                    margin: 0,
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    height: "100%",
                                    gap: "10px",
                                  }}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </Box>
                      </Card>
                    </FrontSide>
                    <BackSide
                      style={{
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        display: "flex",
                        justifyContent: "center",
                        width: "300px",
                        height: "450px",
                        padding: 0,
                      }}
                    >
                      {feedback[cardIndex]?.isCorrect && (
                        <Grid item container>
                          <Card
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              width: "300px",
                              height: "450px",
                              borderRadius: "3px",
                              border: `1.5px solid ${
                                theme.palette.mode === "light"
                                  ? "#160e0e"
                                  : "#f1e9e9"
                              }`,
                            }}
                          >
                            <Box
                              sx={{
                                backgroundColor: `${theme.palette.secondary.main}`,
                                height: "300px",
                                padding: "20px",
                                overflow: "auto",
                              }}
                            >
                              <h2 style={{ margin: "0" }}>{card.question}</h2>
                              <FormLabel disabled>
                                <Typography
                                  sx={{
                                    color: theme.palette.text.primary,
                                    mt: 2,
                                  }}
                                >
                                  Correct!
                                </Typography>
                                <Typography
                                  sx={{
                                    color: theme.palette.text.primary,
                                    mt: 2,
                                  }}
                                >
                                  {card.explanation}
                                </Typography>
                              </FormLabel>
                            </Box>
                            <Box
                              sx={{
                                backgroundColor: `${theme.palette.background.main}`,
                                height: "150px",
                                padding: "20px",
                                borderTop: `1.5px solid ${
                                  theme.palette.mode === "light"
                                    ? "#160e0e"
                                    : "#f1e9e9"
                                }`,
                                overflow: "auto",
                                display: "flex",
                                alignContent: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                              }}
                            >
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <CheckIcon
                                  sx={{ color: theme.palette.completion.good }}
                                />
                                <Typography sx={{ ml: 2 }}>
                                  {card.answer}
                                </Typography>
                              </Box>
                            </Box>
                          </Card>
                        </Grid>
                      )}

                      {!feedback[cardIndex]?.isCorrect &&
                        feedback[cardIndex] && (
                          <Grid container>
                            <Card
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "300px",
                                height: "450px",
                                borderRadius: "3px",
                                border: `1.5px solid ${
                                  theme.palette.mode === "light"
                                    ? "#160e0e"
                                    : "#f1e9e9"
                                }`,
                                overflow: "hidden",
                              }}
                            >
                              <Box
                                sx={{
                                  backgroundColor: `${theme.palette.primary.main}`,
                                  height: "300px",
                                  padding: "20px",
                                  overflow: "auto",
                                }}
                              >
                                <h2 style={{ margin: "0" }}>{card.question}</h2>
                                <FormLabel disabled>
                                  <Typography
                                    sx={{
                                      color: theme.palette.text.primary,
                                      mt: 2,
                                    }}
                                  >
                                    Incorrect!
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: theme.palette.text.primary,
                                      mt: 2,
                                    }}
                                  >
                                    {card.explanation}
                                  </Typography>
                                </FormLabel>
                              </Box>
                              <Box
                                sx={{
                                  backgroundColor: `${theme.palette.background.main}`,
                                  height: "150px",
                                  padding: "20px",
                                  borderTop: `1.5px solid ${
                                    theme.palette.mode === "light"
                                      ? "#160e0e"
                                      : "#f1e9e9"
                                  }`,
                                  overflow: "auto",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexDirection: "column",
                                }}
                              >
                                <CloseIcon
                                  sx={{ color: theme.palette.completion.poor }}
                                />
                                <p>
                                  <span style={{ fontWeight: "bold" }}>
                                    Correct answer:
                                  </span>{" "}
                                  {feedback[cardIndex]?.correctAnswer}
                                </p>
                              </Box>
                            </Card>
                          </Grid>
                        )}
                    </BackSide>
                  </Flippy>
                </Grid>
              ) : (
                <Grid
                  item
                  container
                  justifyContent="center"
                  alignItems="center"
                >
                  <Card
                    key={card.id}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "300px",
                      height: "450px",
                      borderRadius: "3px",
                      border: `1.5px solid ${
                        theme.palette.mode === "light" ? "#160e0e" : "#f1e9e9"
                      }`,
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: `${theme.palette.secondary.main}`,
                        width: "300px",
                        height: "300px",
                        padding: "20px",
                        overflow: "auto",
                      }}
                    >
                      <h2 style={{ margin: "0" }}>{card.question}</h2>
                      <FormLabel disabled>
                        <Typography
                          sx={{ color: theme.palette.text.primary, mt: 2 }}
                        >
                          Correct!
                        </Typography>
                        <Typography
                          sx={{ color: theme.palette.text.primary, mt: 2 }}
                        >
                          {card.explanation}
                        </Typography>
                      </FormLabel>
                    </Box>
                    <Box
                      sx={{
                        backgroundColor: `${theme.palette.background.main}`,
                        width: "300px",
                        height: "150px",
                        padding: "20px",
                        borderTop: `1.5px solid ${
                          theme.palette.mode === "light" ? "#160e0e" : "#f1e9e9"
                        }`,
                        overflow: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CheckIcon
                          sx={{ color: theme.palette.completion.good }}
                        />
                        <Typography sx={{ ml: 2 }}>{card.answer}</Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              )}
            </React.Fragment>
          ))}
        </Grid>
      </Container>
    </Container>
  );
}

export default CardPage;
