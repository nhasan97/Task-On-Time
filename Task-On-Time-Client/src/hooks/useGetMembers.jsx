import { useQuery } from "@tanstack/react-query";
import { getUsersData } from "../api/usersAPIs";

const useGetMembers = () => {
  const {
    isLoading: loadingMembers,
    data: members,
    refetch: refetchMembers,
  } = useQuery({
    queryKey: ["getMembers"],
    queryFn: getUsersData,
  });

  return [members, loadingMembers, refetchMembers];
};

export default useGetMembers;
