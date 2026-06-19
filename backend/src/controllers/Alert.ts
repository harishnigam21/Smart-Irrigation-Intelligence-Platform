import { Response } from "express";
import { AuthRequest } from "../types/AuthRequest";
import { getServerError } from "../utils/serverError";
import { Alert, IAlert } from "../models/Alert";
import mongoose from "mongoose";

export const getAlert = async (req: AuthRequest, res: Response) => {
  try {
    type getAlert = Pick<
      IAlert,
      "type" | "status" | "severity" | "message" | "createdAt"
    > & {
      _id: string;
      deviceId: {
        _id: string;
        nickName: string;
      };
      farmId: {
        _id: string;
        nickName: string;
      };
    };
    const alertId = req.params.id;
    const alert = await Alert.findById(alertId)
      .populate("deviceId", "_id nickName")
      .populate("farmId", "_id nickName")
      .select("_id type status severity message createdAt deviceId farmId")
      .lean<getAlert>();

    if (!alert) {
      return res.status(404).json({ message: "Alert Not found" });
    }
    return res.status(200).json({ message: "Alert found", data: alert });
  } catch (error) {
    getServerError(res, error, "getAlert Controller");
  }
};

interface AlertQueryFilter {
  cursor: string | null;
  limit?: string;
  farmId?: string;
  deviceId?: string;
  direction?: string;
  page?: string;
  st?: string;
  sr?: string;
  tr?: string;
  im?: string;
}
export const getAlerts = async (
  req: AuthRequest<{}, {}, {}, AlertQueryFilter>,
  res: Response,
) => {
  try {
    const {
      cursor,
      limit,
      farmId,
      deviceId,
      direction = "next",
      page,
      st,
      sr,
      tr,
      im,
    } = req.query;
    const lm = limit ? parseInt(limit, 10) : 25;
    const ifPage = page ? parseInt(page, 10) : null;
    let sortDirection: mongoose.SortOrder = -1;

    const baseFilter: Record<string, any> = {
      userId: req.user!._id,
      deleted: false,
    };

    if (farmId) {
      baseFilter.farmId = new mongoose.Types.ObjectId(farmId as string);
    }
    if (deviceId) {
      baseFilter.deviceId = new mongoose.Types.ObjectId(deviceId as string);
    }
    if (st) {
      baseFilter.status = st == "1" ? false : true;
    }
    if (sr) {
      baseFilter.star = sr == "1" ? true : false;
    }
    if (im) {
      baseFilter.important = im == "1" ? true : false;
    }
    if (tr) {
      baseFilter.deleted = tr == "1" ? true : false;
    }

    const queryFilter = { ...baseFilter };
    if (cursor && typeof cursor === "string" && cursor.length === 24) {
      const objectId = new mongoose.Types.ObjectId(cursor);
      if (direction === "next") {
        queryFilter._id = { $lt: objectId };
        sortDirection = -1;
      } else if (direction === "previous") {
        queryFilter._id = { $gt: objectId };
        sortDirection = 1;
      }
    }
    const totalAlerts = await Alert.countDocuments(baseFilter);
    let Alerts = ifPage
      ? await Alert.find(queryFilter)
          .select(
            "_id deviceId type status star deleted important severity message createdAt",
          )
          .populate("deviceId", "nickName")
          .sort({ _id: -1 })
          .skip((ifPage - 1) * lm)
          .limit(lm)
          .lean()
      : await Alert.find(queryFilter)
          .select(
            "_id deviceId type status star deleted important severity message createdAt",
          )
          .populate("deviceId", "nickName")
          .sort({ _id: sortDirection })
          .limit(lm)
          .lean();
    if (direction === "previous") {
      Alerts = Alerts.reverse();
    }
    const totalPages = totalAlerts > lm ? Math.ceil(totalAlerts / lm) : 1;
    let currentPage = 1;
    if (Alerts.length > 0) {
      const newestItemInBatch = Alerts[0]._id;
      const itemsAhead = await Alert.countDocuments({
        ...baseFilter,
        _id: { $gt: newestItemInBatch },
      });
      currentPage = Math.floor(itemsAhead / lm) + 1;
    }
    const hasItems = Alerts.length > 0;
    const nextCursor = hasItems ? Alerts[Alerts.length - 1]._id : null;
    const prevCursor = hasItems ? Alerts[0]._id : null;
    return res.status(200).json({
      message: "Alerts Found",
      pagination: {
        totalPages,
        currentPage,
        nextCursor,
        prevCursor,
      },
      data: Alerts,
    });
  } catch (error) {
    getServerError(res, error, "getAlerts Controller");
  }
};

export const createAlert = async (req: AuthRequest, res: Response) => {};
export const updateAlert = async (req: AuthRequest, res: Response) => {};
export const deleteAlert = async (req: AuthRequest, res: Response) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length == 0) {
      return res
        .status(400)
        .json({ message: "Invalid selections", status: false });
    }
    await Alert.updateMany(
      { userId: req.user!._id, _id: { $in: ids } },
      {
        $set: { deleted: true, star: false, important: false, status: false },
      },
    );
    return res.status(200).json({ status: true });
  } catch (error) {
    getServerError(res, error, "deleteAlert controller");
  }
};

export const handleStar = async (req: AuthRequest, res: Response) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length == 0) {
      return res
        .status(400)
        .json({ message: "Invalid selections", status: false });
    }
    await Alert.updateMany(
      { userId: req.user!._id, _id: { $in: ids } },
      {
        $set: { star: true },
      },
    );
    return res.status(200).json({ status: true });
  } catch (error) {
    getServerError(res, error, "handleStar controller");
  }
};
export const handleUnStar = async (req: AuthRequest, res: Response) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length == 0) {
      return res
        .status(400)
        .json({ message: "Invalid selections", status: false });
    }
    await Alert.updateMany(
      { userId: req.user!._id, _id: { $in: ids } },
      {
        $set: { star: false },
      },
    );
    return res.status(200).json({ status: true });
  } catch (error) {
    getServerError(res, error, "handleUnStar controller");
  }
};

export const handleImportant = async (req: AuthRequest, res: Response) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length == 0) {
      return res
        .status(400)
        .json({ message: "Invalid selections", status: false });
    }
    await Alert.updateMany(
      { userId: req.user!._id, _id: { $in: ids } },
      {
        $set: { important: true },
      },
    );
    return res.status(200).json({ status: true });
  } catch (error) {
    getServerError(res, error, "handleImportant controller");
  }
};
export const handleUnImportant = async (req: AuthRequest, res: Response) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length == 0) {
      return res
        .status(400)
        .json({ message: "Invalid selections", status: false });
    }
    await Alert.updateMany(
      { userId: req.user!._id, _id: { $in: ids } },
      {
        $set: { important: false },
      },
    );
    return res.status(200).json({ status: true });
  } catch (error) {
    getServerError(res, error, "handleUnImportant controller");
  }
};

export const handleRead = async (req: AuthRequest, res: Response) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length == 0) {
      return res
        .status(400)
        .json({ message: "Invalid selections", status: false });
    }
    await Alert.updateMany(
      { userId: req.user!._id, _id: { $in: ids } },
      {
        $set: { status: false },
      },
    );
    return res.status(200).json({ status: true });
  } catch (error) {
    getServerError(res, error, "handleRead controller");
  }
};
export const handleUnread = async (req: AuthRequest, res: Response) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length == 0) {
      return res
        .status(400)
        .json({ message: "Invalid selections", status: false });
    }
    await Alert.updateMany(
      { userId: req.user!._id, _id: { $in: ids } },
      {
        $set: { status: true },
      },
    );
    return res.status(200).json({ status: true });
  } catch (error) {
    getServerError(res, error, "handleUnread controller");
  }
};
