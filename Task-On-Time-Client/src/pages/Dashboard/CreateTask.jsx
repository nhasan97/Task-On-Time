import DashboardContainer from "../../components/dashboard/shared/DashboardContainer";
import { useForm } from "react-hook-form";
import useCurrentDate from "../../hooks/useCurrentDate";
import dateComparer from "../../utilities/dateComparer";
import {
  showAlertOnError,
  showAlertOnSuccess,
} from "../../utilities/displaySweetAlert";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import Loading from "../../components/shared/Loading";
import { MdDescription, MdAssignment, MdLowPriority } from "react-icons/md";
import Title from "../../components/shared/Title/Title";
import { saveTaskData } from "../../api/taskAPIs";
import useGetMembers from "../../hooks/useGetMembers";

const CreateTask = () => {
  const { user, loading } = useAuth();

  const { register, handleSubmit, reset } = useForm();

  const today = useCurrentDate();

  const navigate = useNavigate();

  const priorities = ["Low", "Moderate", "High"];

  //fetching members data

  const [members, loadingMembers] = useGetMembers();

  //setting the title
  const title = {
    mainTitle: "Create Tasks",
    subTitle: "",
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["createTasks"],
    mutationFn: saveTaskData,
    onSuccess: () => {
      showAlertOnSuccess("Inserted successfully!");
      reset();
      queryClient.invalidateQueries("createTasks");
      navigate(location?.state ? location.state : "/dashboard/manage-tasks");
    },
    onError: (error) => {
      showAlertOnError(error);
    },
  });

  const onSubmit = async (data) => {
    const dateValidity = dateComparer(today, data.deadline);

    if (dateValidity === "invalid") {
      showAlertOnError("Please enter a valid date!");
    } else {
      if (user.email) {
        const task = {
          title: data.title,
          description: data.description,
          deadline: data.deadline,
          priority: data.priority,
          assignTo: data.assignTo,
          status: "initialized",
          email: user?.email,
        };

        mutation.mutate(task);
      } else return;
    }
  };

  if (mutation.isLoading || loading || loadingMembers) {
    return <Loading />;
  }

  const filteredMembers = members.filter(
    (member) => member.name !== user.displayName
  );

  return (
    <DashboardContainer>
      <Helmet>
        <title>TaskOnTime | Dashboard | Create Survey</title>
      </Helmet>

      <Title title={title}></Title>

      <div className="w-[90%] flex flex-col justify-center items-center px-10 py-5 border rounded-lg">
        <form
          className="w-full flex flex-col gap-4 text-left"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="relative">
            <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
              <i className="fa-solid fa-t text-xl text-white"></i>
            </div>
            <input
              type="text"
              {...register("title")}
              placeholder="Title"
              required
              className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
            />
          </div>

          <div className="relative">
            <div className="h-20 w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
              <MdDescription className="text-2xl text-white" />
            </div>
            <textarea
              type="email"
              {...register("description")}
              placeholder="Description"
              required
              className="input bg-[#a1dada41] w-full h-20 pl-16 py-3 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
            />
          </div>

          <div className="relative">
            <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
              <MdLowPriority className="text-2xl text-white" />
            </div>
            <select
              type="text"
              {...register("priority")}
              placeholder="Priority"
              required
              className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
            >
              {priorities.map((priority) => (
                <option key={priority}>{priority}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
              <MdAssignment className="text-2xl text-white" />
            </div>
            <select
              type="text"
              {...register("assignTo")}
              placeholder="Assign To"
              required
              className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
            >
              {filteredMembers.map((member) => (
                <option key={member.name}>{member.name}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
              <i className="fa-regular fa-calendar-days text-xl text-white"></i>
            </div>
            <input
              type="date"
              id="in4"
              {...register("deadline")}
              placeholder="Deadline"
              required
              className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
            />
          </div>

          <input
            type="submit"
            value="Create"
            className="btn w-1/2 mx-auto bg-[#FE7E51] text-lg font-medium text-white hover:text-[#FE7E51] normal-case rounded-lg"
          />
        </form>
      </div>
    </DashboardContainer>
  );
};

export default CreateTask;
