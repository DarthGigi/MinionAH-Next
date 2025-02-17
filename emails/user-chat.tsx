import { Body, Button, Column, Container, Head, Heading, Hr, Html, Img, Link, Preview, Row, Section, Tailwind, Text } from "@react-email/components";
import { env } from "~/env";

export interface UserChatEmailProps {
  username: string;
  chatByUserImage: string;
  chatByUsername: string;
}

const baseUrl = env.BASE_URL ? `https://${env.BASE_URL}` : "";

export const UserChatEmail = ({ username, chatByUserImage, chatByUsername }: UserChatEmailProps) => {
  const previewText = `${chatByUsername} has sent you a message on MinionAH`;

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
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-[#e6e6e6]">You have a new message</Heading>
            <Text className="text-[14px] leading-[24px] text-[#e6e6e6]">Hello {username},</Text>
            <Text className="text-[14px] leading-[24px] text-[#e6e6e6]">
              <Link href={`${baseUrl}/users/${chatByUsername}`} className="text-white underline">
                <strong>{chatByUsername}</strong>
              </Link>{" "}
              has sent you a message on MinionAH.
            </Text>
            <Section>
              <Row>
                <Column align="center">
                  <Link href={`${baseUrl}/users/${chatByUsername}`} className="text-white underline">
                    <div className="w-fit rounded-full bg-[#404040] p-6">
                      <Img className="aspect-square size-[4.5rem] overflow-visible" src={chatByUserImage} width="72" height="72" />
                    </div>
                  </Link>
                </Column>
              </Row>
            </Section>
            <Section className="mt-[32px] text-center">
              <Button className="rounded bg-[#e6e6e6] px-5 py-3 text-center text-[12px] font-semibold text-[#171717] no-underline" href={`${baseUrl}/user/${chatByUsername}/chat`}>
                View Message
              </Button>
            </Section>
            <Hr className="mx-0 mb-[20px] mt-[26px] w-full border border-solid border-[#404040]" />
            <Section className="text-center">
              <Text className="m-0 text-[12px] leading-[24px] text-[#666666]">
                Don&apos;t want to receive these emails? <br />
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

UserChatEmail.PreviewProps = {
  username: "DarthGigi",
  chatByUserImage: "https://res.cloudinary.com/minionah/image/upload/v1/users/avatars/d8d5a9237b2043d8883b1150148d6955",
  chatByUsername: "Testperson"
} as UserChatEmailProps;

export default UserChatEmail;
