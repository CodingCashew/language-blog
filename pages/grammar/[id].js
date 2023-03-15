import { Button, Container, Input, Text, Flex } from "@chakra-ui/react";
import { useState } from "react";
import NavButtons from "../../components/navButtons";

const answers = {
  one: "have",
  two: "been",
  three: "Have",
  four: "you",
  five: "seen",
};

// export const getServerSideProps = async (context) => {
//   const res = await fetch("http://localhost:3000/api/grammar/", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const data = await res.json();
// const numOfExercises = data.length

//   let grammar = data.filter((grammar) => grammar.id == context.query.id);

//   grammar = grammar[0];

//   return {
//     props: { grammar, numOfExercises },
//   };
// };

function GrammarExercise({ grammar, numOfExercises }) {
  const section = "grammar";
  const [revealAnswers, setRevealingAnswers] = useState(false);
  const [values, setValues] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const [corrections, setCorrections] = useState({});

  const checkAnswers = () => {
    setRevealingAnswers(true);

    for (let questionNumber in values) {
      if (
        values[questionNumber].toLowerCase().trim() !==
        // grammar.answers[questionNumber].toLowerCase()
        answers[questionNumber].toLowerCase()
      ) {
        setCorrections((corrections) => ({
          ...corrections,
          // [questionNumber]: grammar.answers[questionNumber],
          [questionNumber]: answers[questionNumber],
        }));
      }
    }
  };

  const clearAnswers = () => {
    setRevealingAnswers(false);
    setValues({
      one: "",
      two: "",
      three: "",
      four: "",
      five: "",
    });
    setCorrections({});
  };

  // const arrayOfStumps = [
  //   "I",
  //   {name: "one",
  //   onChange: "{handleChange}"},
  //   {name: "two",
  //   onChange: "{handleChange}"},
  //   {name: "three",
  //   onChange: "{handleChange}"},
  //   "France"
  // ]

  return (
    <Container maxW="2xl" minH="md">

      {/* {arrayOfStumps.reduce((acc, curr) => {
        if (typeof curr === 'string') acc.push(<Text>{curr}</Text>)
        else acc.push(<Input name={curr.name} onChange={curr.onChange}/>)
        console.log('acc: ', acc)
        return {...acc}
      }, []).parse()} */}

      <Text fontSize="xl" align="center">
        Hardcoded Grammar Exercise
      </Text>
      <Container>
        <Flex maxW="2xl" direction="row" flexWrap="wrap">
          <Text fontSize="lg" direction="row">
            1. I
          </Text>
          <Flex direction="column">
            <Input
              htmlSize={4}
              width="auto"
              name="one"
              onChange={handleChange}
            />
            {corrections["one"] && (
              <Text ml={3} p={2} color="primary.dark">
                {corrections["one"]}
              </Text>
            )}
          </Flex>

          <Flex direction="column">
            <Input
              htmlSize={4}
              width="auto"
              name="two"
              onChange={handleChange}
            />
            {corrections["two"] && (
              <Text p={2} color="primary.dark">
                {corrections["two"]}
              </Text>
            )}
          </Flex>
          <Text fontSize="lg">to France. (to be)</Text>
        </Flex>
        <Flex>
          <Text fontSize="lg">2.</Text>
          <Flex direction="column">
            <Input
              htmlSize={4}
              width="auto"
              name="three"
              onChange={handleChange}
            />
            {corrections["three"] && (
              <Text ml={3} p={2} color="primary.dark">
                {corrections["three"]}
              </Text>
            )}
          </Flex>
          <Flex direction="column">
            <Input
              htmlSize={4}
              width="auto"
              name="four"
              onChange={handleChange}
            />
            {corrections["four"] && (
              <Text p={2} color="primary.dark">
                {corrections["four"]}
              </Text>
            )}
          </Flex>
          <Flex direction="column">
            <Input
              htmlSize={4}
              width="auto"
              name="five"
              onChange={handleChange}
            />
            {corrections["five"] && (
              <Text p={2} color="primary.dark">
                {corrections["five"]}
              </Text>
            )}
          </Flex>
          <Flex direction="row">
            <Text fontSize="lg">my keys? (you / to see)</Text>
            </Flex>
            </Flex>
            {!Object.keys(corrections).length && revealAnswers && (
              <Text color="primary.main">You got them all correct!!</Text>
            )}
          <Flex direction="row">
            <Button onClick={checkAnswers}>Check Answers</Button>
            <Button onClick={clearAnswers}>Reset Answers</Button>
        </Flex>
      </Container>
      <Text value="have" draggable="true">have</Text>
      <NavButtons numOfExercises={numOfExercises} section={section} />
    </Container>
  );
}

export default GrammarExercise;
