import { Body, Button, Container, Head, Heading, Hr, Html, Img, Link, Preview, Section, Tailwind, Text } from "@react-email/components";
import { env } from "~/env";

export interface MultipleChatsEmailProps {
  username: string;
  chatsAmount: number;
}

const baseUrl = env.BASE_URL ? `https://${env.BASE_URL}` : "";

export const MultipleChatsEmail = ({ username, chatsAmount }: MultipleChatsEmailProps) => {
  const previewText = chatsAmount > 1 ? `${username} you have received new messages on MinionAH` : `${username} you have received a new message on MinionAH`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-[#171717] px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#404040] bg-[#262626] p-[20px]">
            <Section>
              <Img src={`${baseUrl}/favicon.png`} width="52" height="52" alt="MinionAH" className="mx-auto my-0" />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-[#e6e6e6]">{chatsAmount > 1 ? "You have new messages" : "You have a new message"}</Heading>
            <Text className="text-[14px] leading-[24px] text-[#e6e6e6]">Hello {username},</Text>
            <Text className="text-[14px] leading-[24px] text-[#e6e6e6]">
              While you're away, you received {chatsAmount} new {chatsAmount > 1 ? "messages" : "message"} on MinionAH.
            </Text>

            <Section className="mt-[40px] text-center">
              <Button className="rounded bg-[#e6e6e6] px-5 py-3 text-center text-[12px] font-semibold text-[#171717] no-underline" href={`${baseUrl}/profile/chats`}>
                View {chatsAmount > 1 ? "Messages" : "Message"}
              </Button>
            </Section>
            <Hr className="mx-0 mb-[20px] mt-[26px] w-full border border-solid border-[#404040]" />
            <Section className="text-center">
              <Text className="m-0 text-[12px] leading-[24px] text-[#666666]">
                Don't want to receive these emails? <br />
                <Link href={`${baseUrl}/settings/notifications`} className="text-[#666666] underline">
                  Manage your notification settings
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

MultipleChatsEmail.PreviewProps = {
  username: "DarthGigi",
  chatsAmount: 2
} as MultipleChatsEmailProps;

export default MultipleChatsEmail;
