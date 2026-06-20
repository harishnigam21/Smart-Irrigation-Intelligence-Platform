"use client";
import { mediaList } from "@/assets/scripts/mediaList";
import useApi from "@/hooks/useApi";
import {
  Alert,
  deleteAlert,
  markImportant,
  markRead,
  markStar,
  markUnImportant,
  markUnRead,
  markUnStar,
  removeSelectedAlert,
  setAlert,
  setNextCursor,
  setPages,
  setPrevCursor,
  setSelectedAlerts,
  setSwitchLoading,
} from "@/store/slices/AlertSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import { Data } from "@/types/data";
import {
  BookMarked,
  BookmarkOff,
  Check,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Mail,
  MailOpen,
  Minus,
  RotateCw,
  Siren,
  Star,
  StarOff,
  Trash,
} from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import BouncingLoading from "../Loading/BouncingLoading";
import { useRouter, useSearchParams } from "next/navigation";
import { getDaysBetween } from "@/utils/getDate";
import HorizontalBar from "../Loading/HorizontalBar";

export default function AlertInteractionHeader({
  data,
}: {
  data: Data<Alert[]> | null;
}) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const [isPending, startTransition] = useTransition();
  const alerts = useAppSelector((store) => store.alert);
  const selectedAlerts = alerts.selectedAlerts;
  const selectedSidebarItem = alerts.selectedSidebarItem;
  const [interectionToShow, setInterectionToShow] = useState({
    read: false,
    unread: false,
    important: false,
    unimportant: false,
    star: false,
    unstar: false,
  });
  useEffect(() => {
    const allType = selectedAlerts.map((item) => item.type);
    const flatedAllType = allType.flat();
    if (flatedAllType.includes("unread")) {
      setInterectionToShow((prev) => ({ ...prev, read: true, unread: false }));
    }
    if (!flatedAllType.includes("unread") && flatedAllType.includes("read")) {
      setInterectionToShow((prev) => ({ ...prev, read: false, unread: true }));
    }
    if (flatedAllType.includes("unstar")) {
      setInterectionToShow((prev) => ({ ...prev, star: true, unstar: false }));
    }
    if (!flatedAllType.includes("unstar") && flatedAllType.includes("star")) {
      setInterectionToShow((prev) => ({ ...prev, star: false, unstar: true }));
    }
    if (flatedAllType.includes("unimportant")) {
      setInterectionToShow((prev) => ({
        ...prev,
        important: true,
        unimportant: false,
      }));
    }
    if (
      !flatedAllType.includes("unimportant") &&
      flatedAllType.includes("important")
    ) {
      setInterectionToShow((prev) => ({
        ...prev,
        important: false,
        unimportant: true,
      }));
    }
  }, [selectedAlerts]);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { sendRequest, loading: intereactionLoading } = useApi();
  const searchParams = useSearchParams();
  const handleStar = async (ids: string[]) => {
    await sendRequest(`api/alert/star`, "PATCH", { ids }).then((result) => {
      const data = result.data as Data<null> | undefined;
      if (result && result.success && data) {
        if (data.status) {
          dispatch(markStar(ids));
          dispatch(setSelectedAlerts(null));
        }
      } else {
        const msg = data?.message || "Failed to mark Star";
        toast.error(msg);
      }
    });
  };
  const handleUnStar = async (ids: string[]) => {
    await sendRequest(`api/alert/unstar`, "PATCH", { ids }).then(
      async (result) => {
        const data = result.data as Data<null> | undefined;
        if (result && result.success && data) {
          if (data.status) {
            dispatch(markUnStar(ids));
            const crossCheck = alerts.alerts?.filter(
              (item) => !ids.includes(item._id),
            );
            const switchPage = () => {
              if (
                crossCheck &&
                crossCheck.length == 0 &&
                alerts.currentPage != 1 &&
                alerts.currentPage == alerts.totalPages
              ) {
                return alerts.currentPage - 1;
              } else {
                return alerts.currentPage;
              }
            };
            if (selectedSidebarItem == "star") {
              router.push(`/alerts?sr=1&page=${switchPage()}`);
            }
            dispatch(setSelectedAlerts(null));
          }
        } else {
          const msg = data?.message || "Failed to mark unStar";
          toast.error(msg);
        }
      },
    );
  };
  const handleDelete = async (ids: string[]) => {
    await sendRequest(`api/alert`, "DELETE", { ids }).then(async (result) => {
      const data = result.data as Data<null> | undefined;
      if (result && result.success && data) {
        if (data.status) {
          dispatch(deleteAlert(ids));
          dispatch(setSelectedAlerts(null));
          const crossCheck = alerts.alerts?.filter(
            (item) => !ids.includes(item._id),
          );
          const switchPage = () => {
            if (
              crossCheck &&
              crossCheck.length == 0 &&
              alerts.currentPage != 1 &&
              alerts.currentPage == alerts.totalPages
            ) {
              return alerts.currentPage - 1;
            } else {
              return alerts.currentPage;
            }
          };
          const params = new URLSearchParams({
            page: switchPage().toString(),
          });

          if (searchParams.get("st") === "1") params.append("st", "1");
          if (searchParams.get("sr") === "1") params.append("sr", "1");
          if (searchParams.get("tr") === "1") params.append("tr", "1");
          if (searchParams.get("im") === "1") params.append("im", "1");
          router.push(`/alerts?${params.toString()}`);
        }
      } else {
        const msg = data?.message || "Failed to delete alerts";
        toast.error(msg);
      }
    });
  };
  const handleImportant = async (ids: string[]) => {
    await sendRequest(`api/alert/important`, "PATCH", { ids }).then(
      (result) => {
        const data = result.data as Data<null> | undefined;
        if (result && result.success && data) {
          if (data.status) {
            dispatch(markImportant(ids));
            dispatch(setSelectedAlerts(null));
          }
        } else {
          const msg = data?.message || "Failed to mark Important";
          toast.error(msg);
        }
      },
    );
  };
  const handleUnImportant = async (ids: string[]) => {
    await sendRequest(`api/alert/unImportant`, "PATCH", { ids }).then(
      async (result) => {
        const data = result.data as Data<null> | undefined;
        if (result && result.success && data) {
          if (data.status) {
            dispatch(markUnImportant(ids));
            const crossCheck = alerts.alerts?.filter(
              (item) => !ids.includes(item._id),
            );
            const switchPage = () => {
              if (
                crossCheck &&
                crossCheck.length == 0 &&
                alerts.currentPage != 1 &&
                alerts.currentPage == alerts.totalPages
              ) {
                return alerts.currentPage - 1;
              } else {
                return alerts.currentPage;
              }
            };
            dispatch(setSelectedAlerts(null));
            if (selectedSidebarItem == "important") {
              router.push(`/alerts?im=1&page=${switchPage()}`);
            }
          }
        } else {
          const msg = data?.message || "Failed to mark unImportant";
          toast.error(msg);
        }
      },
    );
  };
  const handleRead = async (ids: string[]) => {
    await sendRequest(`api/alert/read`, "PATCH", { ids }).then((result) => {
      const data = result.data as Data<null> | undefined;
      if (result && result.success && data) {
        if (data.status) {
          dispatch(markRead(ids));
          dispatch(setSelectedAlerts(null));
        }
      } else {
        const msg = data?.message || "Failed to mark read";
        toast.error(msg);
      }
    });
  };
  const handleUnread = async (ids: string[]) => {
    await sendRequest(`api/alert/unread`, "PATCH", { ids }).then((result) => {
      const data = result.data as Data<null> | undefined;
      if (result && result.success && data) {
        if (data.status) {
          dispatch(markUnRead(ids));
          dispatch(setSelectedAlerts(null));
        }
      } else {
        const msg = data?.message || "Failed to mark unread";
        toast.error(msg);
      }
    });
  };
  const handleRecover = async (ids: string[]) => {};
  const handlePDelete = async (ids: string[]) => {};

  useEffect(() => {
    try {
      if (data && data.data) {
        dispatch(setAlert(data.data));
        dispatch(setNextCursor(data?.pagination?.nextCursor || null));
        dispatch(setPrevCursor(data?.pagination?.prevCursor || null));
        dispatch(
          setPages({
            total: data.pagination?.totalPages || 1,
            current: data.pagination?.currentPage || 1,
          }),
        );
      }
    } catch (error) {
    } finally {
      dispatch(setSwitchLoading({ status: false, switch: "" }));
    }
  }, [data, dispatch]);

  const activeAlertsList =
    alerts.alerts && alerts.alerts.length > 0
      ? alerts.alerts
      : data?.data || [];
  const isTrulyEmpty =
    (!alerts.alerts || alerts.alerts.length === 0) &&
    (!data?.data || data.data.length === 0);
  return (
    <>
      <div className="bg-bgsecondary text-txlight shrink-0 flex items-center justify-between gap-4 py-4 px-4 w-full overflow-x-hidden">
        {selectedSidebarItem == "trash" ? (
          <div className="flex flex-nowrap items-center gap-4">
            <div className="flex flex-nowrap items-center gap-1">
              <div
                className={`size-4 border border-txlight cursor-pointer flex items-center justify-center ${selectedAlerts.length > 0 && "bg-blue-500 text-white"}`}
                onClick={() => {
                  if (selectedAlerts.length > 0) {
                    dispatch(setSelectedAlerts(null));
                  } else {
                    alerts.alerts?.forEach((item) => {
                      const letItemType: string[] = [];
                      if (item.deleted) {
                        letItemType.push("recover");
                      }
                      dispatch(
                        setSelectedAlerts({ _id: item._id, type: letItemType }),
                      );
                    });
                  }
                }}
              >
                {selectedAlerts.length > 0 ? (
                  selectedAlerts.length !== alerts.alerts?.length ? (
                    <Minus strokeWidth={4} className="size-3" />
                  ) : (
                    <Check strokeWidth={4} className="size-3" />
                  )
                ) : (
                  <></>
                )}
              </div>
            </div>
            {selectedAlerts.length > 0 && (
              <div className={`flex gap-4 items-center`}>
                <RotateCw
                  className="size-4 text-txlight hover:text-txlight/75"
                  onClick={() =>
                    handleRecover(selectedAlerts.map((item) => item._id))
                  }
                >
                  <title>Recover</title>
                </RotateCw>
                <Trash
                  className="size-4 text-txlight hover:text-txlight/75"
                  onClick={() =>
                    handlePDelete(selectedAlerts.map((item) => item._id))
                  }
                >
                  <title>Permanent Delete</title>
                </Trash>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-nowrap items-center gap-4">
            <div className="flex flex-nowrap items-center gap-1">
              <div
                className={`size-4 border border-txlight cursor-pointer flex items-center justify-center ${selectedAlerts.length > 0 && "bg-blue-500 text-white"}`}
                onClick={() => {
                  if (selectedAlerts.length > 0) {
                    dispatch(setSelectedAlerts(null));
                  } else {
                    alerts.alerts?.forEach((item) => {
                      const letItemType: string[] = [];
                      if (item.status) {
                        letItemType.push("unread");
                      } else {
                        letItemType.push("read");
                      }
                      if (item.important) {
                        letItemType.push("important");
                      } else {
                        letItemType.push("unimportant");
                      }
                      if (item.star) {
                        letItemType.push("star");
                      } else {
                        letItemType.push("unstar");
                      }
                      dispatch(
                        setSelectedAlerts({ _id: item._id, type: letItemType }),
                      );
                    });
                  }
                }}
              >
                {selectedAlerts.length > 0 ? (
                  selectedAlerts.length !== alerts.alerts?.length ? (
                    <Minus strokeWidth={4} className="size-3" />
                  ) : (
                    <Check strokeWidth={4} className="size-3" />
                  )
                ) : (
                  <></>
                )}
              </div>
              <mediaList.FaCaretDown className="text-sm" />
            </div>
            <RotateCw className="size-4" />
            <EllipsisVertical className="size-4" />
            {selectedAlerts.length > 0 && (
              <div className={`flex gap-4 items-center`}>
                {interectionToShow.star && (
                  <Star
                    className="size-4 text-txlight hover:text-txlight/75"
                    onClick={() =>
                      handleStar(selectedAlerts.map((item) => item._id))
                    }
                  >
                    <title>Star</title>
                  </Star>
                )}
                {interectionToShow.unstar && (
                  <StarOff
                    className="size-4 text-txlight hover:text-txlight/75"
                    onClick={() =>
                      handleUnStar(selectedAlerts.map((item) => item._id))
                    }
                  >
                    <title>unStar</title>
                  </StarOff>
                )}
                {interectionToShow.important && (
                  <BookMarked
                    className="size-4 text-txlight hover:text-txlight/75"
                    onClick={() =>
                      handleImportant(selectedAlerts.map((item) => item._id))
                    }
                  >
                    <title>Mark Important</title>
                  </BookMarked>
                )}
                {interectionToShow.unimportant && (
                  <BookmarkOff
                    className="size-4 text-txlight hover:text-txlight/75"
                    onClick={() =>
                      handleUnImportant(selectedAlerts.map((item) => item._id))
                    }
                  >
                    <title>Mark unImportant</title>
                  </BookmarkOff>
                )}
                {interectionToShow.read && (
                  <MailOpen
                    className="size-4 text-txlight hover:text-txlight/75"
                    onClick={() =>
                      handleRead(selectedAlerts.map((item) => item._id))
                    }
                  >
                    <title>Mark as read</title>
                  </MailOpen>
                )}
                {interectionToShow.unread && (
                  <Mail
                    className="size-4 text-txlight hover:text-txlight/75"
                    onClick={() =>
                      handleUnread(selectedAlerts.map((item) => item._id))
                    }
                  >
                    <title>Mark as unread</title>
                  </Mail>
                )}
                <Trash
                  className="size-4 text-txlight hover:text-txlight/75"
                  onClick={() =>
                    handleDelete(selectedAlerts.map((item) => item._id))
                  }
                >
                  <title>Delete</title>
                </Trash>
              </div>
            )}
          </div>
        )}
        <div className="flex items-center flex-nowrap gap-4">
          <small className="whitespace-nowrap">
            {alerts.currentPage} of {alerts.totalPages}
          </small>
          <div className="flex flex-nowrap gap-6">
            <button
              disabled={alerts.currentPage == 1}
              className="cursor-pointer size-4"
              onClick={() => {
                const params = new URLSearchParams({
                  cursor: alerts.prevCursor || "null",
                  direction: "previous",
                });
                if (searchParams.get("st") === "1") params.append("st", "1");
                if (searchParams.get("sr") === "1") params.append("sr", "1");
                if (searchParams.get("tr") === "1") params.append("tr", "1");
                if (searchParams.get("im") === "1") params.append("im", "1");
                dispatch(setSelectedAlerts(null));
                startTransition(() => {
                  router.push(`/alerts?${params.toString()}`);
                });
              }}
              title="previous"
            >
              <ChevronLeft className="size-full" />
            </button>
            <button
              disabled={alerts.currentPage == alerts.totalPages}
              title="next"
              className="cursor-pointer size-4"
              onClick={() => {
                const params = new URLSearchParams({
                  cursor: alerts.nextCursor || "null",
                  direction: "next",
                });
                if (searchParams.get("st") === "1") params.append("st", "1");
                if (searchParams.get("sr") === "1") params.append("sr", "1");
                if (searchParams.get("tr") === "1") params.append("tr", "1");
                if (searchParams.get("im") === "1") params.append("im", "1");
                dispatch(setSelectedAlerts(null));
                startTransition(() => {
                  router.push(`/alerts?${params.toString()}`);
                });
              }}
            >
              <ChevronRight className="size-full" />
            </button>
          </div>
        </div>
      </div>
      {(isPending || intereactionLoading) && (
        <HorizontalBar position="left-0" />
      )}
      <article className="w-full grow overflow-y-auto">
        {alerts.switchLoading.status ? (
          <div className="w-full h-full flex items-center justify-center">
            <BouncingLoading />
          </div>
        ) : activeAlertsList && activeAlertsList.length > 0 ? (
          <>
            {selectedSidebarItem == "trash" && (
              <div className="w-full flex flex-wrap bg-txlight/10 items-center justify-center text-txlight py-1">
                <small>
                  Messages that have been in Trash more than 30 days will be
                  automatically deleted.
                </small>
                <button
                  className="rounded-full py-1 px-3 text-sm hover:bg-tertiary/20 text-tertiary cursor-pointer"
                  onClick={() => {
                    if (alerts.alerts) {
                      const ids = alerts.alerts.map((item) => item._id);
                      handlePDelete(ids);
                    }
                  }}
                >
                  Empty Trash now
                </button>
              </div>
            )}
            {activeAlertsList.map((item, index) => {
              const isSelected = selectedAlerts
                .map((item) => item._id)
                .includes(item._id);
              return (
                <div
                  key={`alert/listed/${index}`}
                  className={`relative group transition-all py-2 px-4 border-b border-txlight/20 w-full grid grid-cols-[minmax(40px,200px)_minmax(40px,1fr)_minmax(40px,max-content)] hover:shadow-sm hover:shadow-txlight overflow-hidden items-center gap-8 justify-between cursor-pointer ${item.status ? "" : "bg-bgprimary/80"} ${isSelected && "bg-blue-500/30"} text-sm`}
                >
                  <div className="flex flex-nowrap gap-2 items-center">
                    <div className="flex items-center flex-nowrap gap-2 min-w-fit">
                      <div
                        className={`size-4 border border-txlight/50 hover:border-txlight text-white flex items-center justify-center ${isSelected && "bg-blue-500"}`}
                        onClick={() => {
                          if (isSelected) {
                            dispatch(removeSelectedAlert(item._id));
                          } else {
                            const letItemType: string[] = [];
                            if (item.status) {
                              letItemType.push("unread");
                            } else {
                              letItemType.push("read");
                            }
                            if (item.important) {
                              letItemType.push("important");
                            } else {
                              letItemType.push("unimportant");
                            }
                            if (item.star) {
                              letItemType.push("star");
                            } else {
                              letItemType.push("unstar");
                            }
                            dispatch(
                              setSelectedAlerts({
                                _id: item._id,
                                type: letItemType,
                              }),
                            );
                          }
                        }}
                      >
                        {isSelected && (
                          <Check strokeWidth={4} className="w-full" />
                        )}
                      </div>
                      {selectedSidebarItem !== "trash" && (
                        <Star
                          fill={item.star ? "yellow" : "transparent"}
                          className="size-4 text-txlight/50 hover:text-txlight"
                          onClick={() => {
                            if (item.star) {
                              handleUnStar([item._id]);
                            } else {
                              handleStar([item._id]);
                            }
                          }}
                        />
                      )}
                    </div>
                    <p
                      className={`line-clamp-1 ${item.status ? "text-text font-medium" : "text-txlight"}`}
                    >
                      {item.deviceId.nickName}
                    </p>
                  </div>
                  <p className="line-clamp-1 grow text-txlight">
                    {item.message}
                  </p>
                  <small
                    className={`line-clamp-1 flex group-hover:hidden ${item.status ? "text-text" : "text-txlight"}`}
                  >
                    {isMounted ? getDaysBetween(item.createdAt) : "..."}
                  </small>
                  {selectedSidebarItem == "trash" ? (
                    <div
                      className={`h-full hidden group-hover:flex gap-4 items-center`}
                    >
                      <RotateCw
                        className="size-4 text-txlight hover:text-txlight/75"
                        onClick={() => handleRecover([item._id])}
                      >
                        <title>recover</title>
                      </RotateCw>
                      <Trash
                        className="size-4 text-txlight hover:text-txlight/75"
                        onClick={() => handlePDelete([item._id])}
                      >
                        <title>Permanent Delete</title>
                      </Trash>
                    </div>
                  ) : (
                    <div
                      className={`h-full hidden group-hover:flex gap-4 items-center`}
                    >
                      {item.status ? (
                        <MailOpen
                          className="size-4 text-txlight hover:text-txlight/75"
                          onClick={() => handleRead([item._id])}
                        >
                          <title>Mark as Read</title>
                        </MailOpen>
                      ) : (
                        <Mail
                          className="size-4 text-txlight hover:text-txlight/75"
                          onClick={() => handleUnread([item._id])}
                        >
                          <title>Mark as Unread</title>
                        </Mail>
                      )}
                      <BookMarked
                        className={`size-4 ${item.important ? "text-blue-500 hover:text-blue-500/75" : "text-txlight hover:text-txlight/75"}`}
                        onClick={() => {
                          if (item.important) {
                            handleUnImportant([item._id]);
                          } else {
                            handleImportant([item._id]);
                          }
                        }}
                      >
                        <title>
                          {item.important
                            ? "Mark unImportant"
                            : "Mark Important"}
                        </title>
                      </BookMarked>
                      <Trash
                        className="size-4 text-txlight hover:text-txlight/75"
                        onClick={() => handleDelete([item._id])}
                      >
                        <title>Delete</title>
                      </Trash>
                    </div>
                  )}
                </div>
              );
            })}
          </>
        ) : isTrulyEmpty ? (
          <strong className="block text-center font-light text-red-500">
            No Alert Found ?
          </strong>
        ) : null}
      </article>
    </>
  );
}
