import Container from "../../shared/Container";
import Title from "../../shared/Title/Title";
import ClientCard from "./ClientCard";
import "./ClientSection.css";

const ClientSection = () => {
  const title = {
    mainTitle: "See Who Are With Us",
    subTitle: "people who are using TimeOnTask",
  };
  return (
    <Container>
      <div className="min-h-screen my-20">
        <Title title={title}></Title>
        <div className="py-5 lg:10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <ClientCard
            image={"https://i.ibb.co/yWpTcX3/developer.jpg"}
            text={"Full stack Developers"}
            span={"col-span-1 md:col-span-2 lg:col-span-2"}
          ></ClientCard>

          <ClientCard
            image={"https://i.ibb.co/bXTRVLR/software-engineer.webp"}
            text={"Software Engineers"}
            span={"col-span-1 md:col-span-1 lg:col-span-1"}
          ></ClientCard>

          <ClientCard
            image={"https://i.ibb.co/XFQr8y6/Chartered-Accountant.jpg"}
            text={"Chartered Accountants"}
            span={"col-span-1 md:col-span-1 lg:col-span-2"}
          ></ClientCard>

          <ClientCard
            image={"https://i.ibb.co/FgP1PMn/Banker.jpg"}
            text={"Bankers"}
            span={"col-span-1 md:col-span-2 lg:col-span-1"}
          ></ClientCard>

          <ClientCard
            image={"https://i.ibb.co/jvVWk7g/business-men.jpg"}
            text={"Business Men"}
            span={"col-span-1 md:col-span-2 lg:col-span-1"}
          ></ClientCard>

          <ClientCard
            image={"https://i.ibb.co/1nVDHdT/architect.jpg"}
            text={"Architects"}
            span={"col-span-1 md:col-span-1 lg:col-span-3"}
          ></ClientCard>

          <ClientCard
            image={"https://i.ibb.co/VHw8LnP/project-manager.jpg"}
            text={"Project Managers"}
            span={"col-span-1 md:col-span-1 lg:col-span-2"}
          ></ClientCard>

          <ClientCard
            image={"https://i.ibb.co/gymDJ9L/HR-Manager-Job-Description.webp"}
            text={"HR Managers"}
            span={"col-span-1 md:col-span-2 lg:col-span-2"}
          ></ClientCard>

          <ClientCard
            image={
              "https://i.ibb.co/9wJpQzP/Know-About-Becoming-a-Doctor-150r-UD-1.jpg"
            }
            text={"Doctors"}
            span={"col-span-1 md:col-span-3 lg:col-span-1"}
          ></ClientCard>
        </div>
      </div>
    </Container>
  );
};

export default ClientSection;
