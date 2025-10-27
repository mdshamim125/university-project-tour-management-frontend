/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
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
import { toast } from "sonner";
import {
  useGetAllUsersQuery,
  useUpdateUserRoleStatusMutation,
} from "@/redux/features/user/user.api";
import { UpdateUserModal } from "@/components/modules/user/UpdateUserModal";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

export default function ManageUsers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const query: Record<string, string> = {
    page: currentPage.toString(),
    limit: limit.toString(),
    searchTerm,
  };
  if (filterRole) query.role = filterRole;

  const { data, isFetching } = useGetAllUsersQuery(query);
  const [updateUser] = useUpdateUserRoleStatusMutation();
  const { data: currentUser, isLoading: userLoading } =
    useUserInfoQuery(undefined);

  const totalPage = data?.meta?.totalPage || 1;

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
      } else {
        toast.error("Update failed", { id: toastId });
      }
      setSelectedUser(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Error updating user", {
        id: toastId,
      });
    }
  };

  if (userLoading) {
    return (
      <p className="text-center py-10 text-gray-500">Loading user info...</p>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex flex-col justify-between min-h-[calc(100vh-120px)]">
        {/* Header */}
        <div>
          <div className="flex justify-between items-center my-8 flex-wrap gap-3">
            <h1 className="text-xl font-semibold">Manage Users</h1>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setCurrentPage(1);
              }}
              className="flex items-center gap-3 flex-wrap"
            >
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-60"
              />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-48"
              >
                <option value="">All Roles</option>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>
            </form>
          </div>

          {/* Table */}
          <div className="border border-muted rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isFetching ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : data?.data?.length ? (
                  data.data.map((user: any) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="capitalize">
                        {user.role.replace("_", " ")}
                      </TableCell>
                      <TableCell className="capitalize">
                        {user.isActive}
                      </TableCell>
                      <TableCell>
                        {currentUser?.data?.role === "SUPER_ADMIN" &&
                        user.role !== "SUPER_ADMIN" &&
                        currentUser?.data?._id !== user._id ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedUser(user)}
                          >
                            Update
                          </Button>
                        ) : (
                          <span className="text-gray-400 text-sm">N/A</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

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
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) =>
                        prev === totalPage ? prev : prev + 1
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
      </div>

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
