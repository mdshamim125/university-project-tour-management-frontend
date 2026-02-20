// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import {
//   useGetAllUsersQuery,
//   useUpdateUserRoleStatusMutation,
// } from "@/redux/features/user/user.api";
// import { UpdateUserModal } from "@/components/modules/user/UpdateUserModal";
// import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
// import { Loader2 } from "lucide-react";

// export default function ManageUsers() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [limit] = useState(5);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterRole, setFilterRole] = useState("");
//   const [selectedUser, setSelectedUser] = useState<any>(null);

//   const query: Record<string, string> = {
//     page: currentPage.toString(),
//     limit: limit.toString(),
//     searchTerm,
//   };
//   if (filterRole) query.role = filterRole;

//   const { data, isFetching } = useGetAllUsersQuery(query);
//   const [updateUser] = useUpdateUserRoleStatusMutation();
//   const { data: currentUser, isLoading: userLoading } =
//     useUserInfoQuery(undefined);

//   const totalPage = data?.meta?.totalPage || 1;

//   const handleUpdate = async (updatedData: {
//     role: string;
//     isActive: string;
//   }) => {
//     if (!selectedUser) return;

//     const toastId = toast.loading("Updating user...");
//     try {
//       const res = await updateUser({
//         id: selectedUser._id,
//         ...updatedData,
//       }).unwrap();

//       if (res.success) {
//         toast.success("User updated successfully", { id: toastId });
//       } else {
//         toast.error("Update failed", { id: toastId });
//       }
//       setSelectedUser(null);
//     } catch (error: any) {
//       toast.error(error?.data?.message || "Error updating user", {
//         id: toastId,
//       });
//     }
//   };

//   if (userLoading) {
//     return (
//       <Loader2 className="w-8 h-8 animate-spin text-primary" />
//     );
//   }

//   return (
//     <div className="w-full max-w-7xl mx-auto px-5">
//       <div className="flex flex-col justify-between min-h-[calc(100vh-120px)]">
//         {/* Header */}
//         <div>
//           <div className="flex justify-between items-center my-8 flex-wrap gap-3">
//             <h1 className="text-xl font-semibold">Manage Users</h1>

//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 setCurrentPage(1);
//               }}
//               className="flex items-center gap-3 flex-wrap"
//             >
//               <Input
//                 placeholder="Search by name or email..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-60"
//               />
//               <select
//                 value={filterRole}
//                 onChange={(e) => setFilterRole(e.target.value)}
//                 className="border border-gray-300 rounded-md p-2 w-48"
//               >
//                 <option value="">All Roles</option>
//                 <option value="USER">User</option>
//                 <option value="ADMIN">Admin</option>
//                 <option value="SUPER_ADMIN">Super Admin</option>
//               </select>
//             </form>
//           </div>

//           {/* Table */}
//           <div className="border border-muted rounded-md">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Email</TableHead>
//                   <TableHead>Role</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Action</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {isFetching ? (
//                   <TableRow>
//                     <TableCell colSpan={5} className="text-center py-8">
//                       Loading...
//                     </TableCell>
//                   </TableRow>
//                 ) : data?.data?.length ? (
//                   data.data.map((user: any) => (
//                     <TableRow key={user._id}>
//                       <TableCell>{user.name}</TableCell>
//                       <TableCell>{user.email}</TableCell>
//                       <TableCell className="capitalize">
//                         {user.role.replace("_", " ")}
//                       </TableCell>
//                       <TableCell className="capitalize">
//                         {user.isActive}
//                       </TableCell>
//                       <TableCell>
//                         {currentUser?.data?.role === "SUPER_ADMIN" &&
//                         user.role !== "SUPER_ADMIN" &&
//                         currentUser?.data?._id !== user._id ? (
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => setSelectedUser(user)}
//                           >
//                             Update
//                           </Button>
//                         ) : (
//                           <span className="text-gray-400 text-sm">N/A</span>
//                         )}
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={5} className="text-center py-8">
//                       No users found.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </div>

//         {/* Pagination */}
//         {totalPage > 1 && (
//           <div className="flex justify-end mt-4">
//             <Pagination>
//               <PaginationContent>
//                 <PaginationItem>
//                   <PaginationPrevious
//                     onClick={() =>
//                       setCurrentPage((prev) => Math.max(prev - 1, 1))
//                     }
//                     className={
//                       currentPage === 1
//                         ? "pointer-events-none opacity-50"
//                         : "cursor-pointer"
//                     }
//                   />
//                 </PaginationItem>
//                 {Array.from({ length: totalPage }, (_, i) => i + 1).map(
//                   (page) => (
//                     <PaginationItem
//                       key={page}
//                       onClick={() => setCurrentPage(page)}
//                     >
//                       <PaginationLink
//                         className={`cursor-pointer ${
//                           currentPage === page
//                             ? "bg-primary text-white"
//                             : "hover:bg-muted"
//                         }`}
//                         isActive={currentPage === page}
//                       >
//                         {page}
//                       </PaginationLink>
//                     </PaginationItem>
//                   )
//                 )}
//                 <PaginationItem>
//                   <PaginationNext
//                     onClick={() =>
//                       setCurrentPage((prev) =>
//                         prev === totalPage ? prev : prev + 1
//                       )
//                     }
//                     className={
//                       currentPage === totalPage
//                         ? "pointer-events-none opacity-50"
//                         : "cursor-pointer"
//                     }
//                   />
//                 </PaginationItem>
//               </PaginationContent>
//             </Pagination>
//           </div>
//         )}
//       </div>

//       {/* Update Modal */}
//       {selectedUser && (
//         <UpdateUserModal
//           user={selectedUser}
//           open={!!selectedUser}
//           onClose={() => setSelectedUser(null)}
//           onSave={handleUpdate}
//         />
//       )}
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, CheckCircle2, Clock, AlertCircle } from "lucide-react";

import {
  useGetAllUsersQuery,
  useUpdateUserRoleStatusMutation,
} from "@/redux/features/user/user.api";
import { UpdateUserModal } from "@/components/modules/user/UpdateUserModal";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

export default function ManageUsers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(7);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const query: Record<string, string> = {
    page: currentPage.toString(),
    limit: limit.toString(),
    searchTerm,
  };

  if (filterRole && filterRole !== "all") {
    query.role = filterRole;
  }

  const { data, isFetching } = useGetAllUsersQuery(query);
  const [updateUser] = useUpdateUserRoleStatusMutation();
  const { data: currentUserData, isLoading: userLoading } =
    useUserInfoQuery(undefined);

  const users = data?.data ?? [];
  const totalPage = data?.meta?.totalPage || 1;
  const currentUser = currentUserData?.data;

  const handleUpdate = async (updatedData: {
    role: string;
    isActive: string;
  }) => {
    if (!selectedUser) return;

    const toastId = toast.loading("Updating user...");
    try {
      const res = await updateUser({
        id: selectedUser._id,
        ...updatedData,
      }).unwrap();

      if (res.success) {
        toast.success("User updated successfully", { id: toastId });
        setSelectedUser(null);
      } else {
        toast.error("Update failed", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Error updating user", {
        id: toastId,
      });
    }
  };

  if (userLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex items-center gap-2 text-primary">
          <Skeleton className="h-8 w-8 rounded-full" />
          <span>Loading user info...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="border-none shadow-xl">
        <CardHeader className="pb-6 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-3xl font-bold tracking-tight">
                Manage Users
              </CardTitle>
              <CardDescription className="mt-2">
                View, search, and manage user roles and account status
              </CardDescription>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              {/* Search */}
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10"
                />
              </div>

              {/* Role Filter */}
              <Select
                value={filterRole}
                onValueChange={(value) => {
                  setFilterRole(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="USER">User</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          {isFetching ? (
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-16 bg-muted/30 rounded-lg border">
              <h3 className="text-xl font-medium">No users found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your search or role filter
              </p>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user: any) => {
                    const isCurrentUser = currentUser?._id === user._id;
                    const canUpdate =
                      currentUser?.role === "SUPER_ADMIN" &&
                      user.role !== "SUPER_ADMIN" &&
                      !isCurrentUser;

                    return (
                      <TableRow
                        key={user._id}
                        className="hover:bg-muted/50 transition-colors"
                      >
                        <TableCell className="font-medium">
                          {user.name || "—"}
                        </TableCell>
                        <TableCell>{user.email || "—"}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {user.role?.replace("_", " ") || "—"}
                          </Badge>
                        </TableCell>

                        {/* Fixed Status Column */}
                        <TableCell>
                          {(() => {
                            const status = user.isActive?.toUpperCase();

                            if (status === "ACTIVE") {
                              return (
                                <Badge className="bg-green-600 hover:bg-green-700 gap-1.5 px-3 py-1">
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                  Active
                                </Badge>
                              );
                            }

                            if (status === "INACTIVE") {
                              return (
                                <Badge
                                  variant="secondary"
                                  className="bg-gray-500 hover:bg-gray-600 text-white gap-1.5 px-3 py-1"
                                >
                                  <Clock className="h-3.5 w-3.5" />
                                  Inactive
                                </Badge>
                              );
                            }

                            if (status === "BLOCKED") {
                              return (
                                <Badge
                                  variant="destructive"
                                  className="gap-1.5 px-3 py-1"
                                >
                                  <AlertCircle className="h-3.5 w-3.5" />
                                  Blocked
                                </Badge>
                              );
                            }

                            return (
                              <Badge
                                variant="outline"
                                className="text-muted-foreground"
                              >
                                {user.isActive || "Unknown"}
                              </Badge>
                            );
                          })()}
                        </TableCell>

                        <TableCell className="text-right">
                          {canUpdate ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedUser(user)}
                            >
                              Update Role / Status
                            </Button>
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              {isCurrentUser ? "Current User" : "No Permission"}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Pagination */}
          {totalPage > 1 && (
            <div className="flex justify-end mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPage }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem
                        key={page}
                        onClick={() => setCurrentPage(page)}
                      >
                        <PaginationLink
                          className={`cursor-pointer ${
                            currentPage === page
                              ? "bg-primary text-white"
                              : "hover:bg-muted"
                          }`}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ),
                  )}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((prev) =>
                          prev === totalPage ? prev : prev + 1,
                        )
                      }
                      className={
                        currentPage === totalPage
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Update Modal */}
      {selectedUser && (
        <UpdateUserModal
          user={selectedUser}
          open={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}
