"use client";

import {
  FormEventHandler,
  startTransition,
  useActionState,
  useOptimistic,
} from "react";
import { useFormStatus } from "react-dom";
import { submitNameFormData } from "./actions";
import { Button, Code, Input, VStack } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";

export default function ExampleFormBottomSheet() {
  const [actionState, submitAction] = useActionState(
    async (_: string, newName: string) => {
      try {
        const resultMessage = await submitNameFormData({ name: newName });
        return resultMessage.message;
      } catch (error) {
        if (error instanceof Error) {
          return error.message;
        }
        return "failed";
      }
    },
    ""
  );
  const [optimisticState, setOptimisticState] = useOptimistic(actionState);

  const { pending } = useFormStatus();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = formData.get("name");

    if (!name || typeof name !== "string") {
      toaster.create({
        description: "Please enter the name",
      });
      return;
    }

    startTransition(() => {
      setOptimisticState(name);
      submitAction(name);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack gap={"12px"} width={"500px"}>
        <h3>
          This form utilizes React 19 features such as:
          <Code>useActionState</Code>, <Code>useOptimistic</Code>,
          <Code>startTransition</Code>.
        </h3>

        <Input
          type="text"
          name="name"
          placeholder="Enter your name!"
          required
          color={"GrayText"}
        />

        <Button type="submit" disabled={pending} width={"100%"}>
          {pending ? "🟡 Submitting..." : "Submit"}
        </Button>

        <VStack color={"GrayText"}>
          <p>
            Your name will be {optimisticState} if the form submission succeeds.
          </p>

          <h3>Your name is</h3>
          <p>{actionState}</p>
        </VStack>
      </VStack>
    </form>
  );
}
