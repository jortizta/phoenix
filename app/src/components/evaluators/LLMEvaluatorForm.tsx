import { Flex, Heading, Label, Switch, Text } from "@phoenix/components";
import { EvaluatorChatTemplate } from "@phoenix/components/evaluators/EvaluatorChatTemplate";
import { EvaluatorLLMChoice } from "@phoenix/components/evaluators/EvaluatorLLMChoice";
import { EvaluatorPromptPreview } from "@phoenix/components/evaluators/EvaluatorPromptPreview";
import { useEvaluatorStore } from "@phoenix/contexts/EvaluatorContext";

export const LLMEvaluatorForm = () => {
  const evaluatorKind = useEvaluatorStore((state) => state.evaluator.kind);
  if (evaluatorKind !== "LLM") {
    throw new Error("LLMEvaluatorForm called for non-LLM evaluator");
  }
  const { showPromptPreview, setShowPromptPreview } = useEvaluatorStore(
    (state) => ({
      showPromptPreview: state.showPromptPreview,
      setShowPromptPreview: state.setShowPromptPreview,
    })
  );
  return (
    <>
      <Flex direction="column" gap="size-100">
        <Heading level={3}>Prompt</Heading>
        <Text color="text-500">
          Define or load a prompt for your evaluator.
        </Text>
        <Switch isSelected={showPromptPreview} onChange={setShowPromptPreview}>
          <Label>Preview</Label>
        </Switch>
        {showPromptPreview ? (
          <EvaluatorPromptPreview />
        ) : (
          <EvaluatorChatTemplate />
        )}
      </Flex>
      <Flex direction="column" gap="size-100">
        <Heading level={3}>Evaluator Annotation</Heading>
        <Text color="text-500">
          Define the annotation that your evaluator will return.
        </Text>
        <EvaluatorLLMChoice />
      </Flex>
    </>
  );
};
