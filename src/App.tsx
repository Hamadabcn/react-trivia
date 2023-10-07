import QuestionComp from './components/Questions';
import StatBar from './components/StatBar';
import questions from "./questions.json"
import { Questions } from './types';
import { useState } from "react"
import App_module from './App.module.scss';
import Reset from './components/Reset';
import Answer_module from './components/Answer.module.scss';
import Classnames from 'classnames';

function App() {
    const allQuestions = questions as Questions;

    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
    const [correctAnswers, setCorrectAnswer] = useState(0)
    const [incorrectAnswers, setInCorrectAnswer] = useState(0)

    const [waitingToAdvance, setWaitingsToAdvance] = useState(false)

    const onSubmit = (correct: boolean) => {
        if (correct) setCorrectAnswer(correctAnswers + 1)
        else setInCorrectAnswer(incorrectAnswers + 1)

        setWaitingsToAdvance(true);
    };

    const advance = () => {
        setWaitingsToAdvance(false);
        setCurrentQuestionIdx(currentQuestionIdx + 1);
    };

    const reset = () => {
        setCurrentQuestionIdx(0);
        setCorrectAnswer(0);
        setInCorrectAnswer(0);
        setWaitingsToAdvance(false);
    };

    if (currentQuestionIdx >= allQuestions.questions.length)
        return (
            <Reset
                totalQuestions={allQuestions.questions.length}
                correctQuestions={correctAnswers}
                onPress={reset}
            />
        );

    return (
        <div className={App_module.app}>
            <StatBar
                currentQuestion={currentQuestionIdx + 1}
                totalQuestions={allQuestions.questions.length}
                correct={correctAnswers}
                inCorrect={incorrectAnswers}
            />
            <QuestionComp question={allQuestions.questions[currentQuestionIdx]}
                onSubmit={onSubmit}
            />
            {waitingToAdvance && <button onClick={advance} className={Classnames(Answer_module.answer, App_module['next-btn'])}>Next Question...</button>}
        </div>
    );

}

export default App;
