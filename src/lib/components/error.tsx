import { ReactElement } from "react";

export const ErrorTemplate = ({
  errorTitle,
  errorDescription,
}: {
  errorTitle: string;
  errorDescription: string;
}): ReactElement => {
  return (
    <div tw="flex h-full w-full text-white text-7xl flex-col items-center justify-center bg-[#171717]">
      <span>{errorTitle}</span>
      <span tw="text-3xl mt-10">{errorDescription}</span>
    </div>
  );
};
