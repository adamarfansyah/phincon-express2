export const handleServerError = (res) => {
  if (res.data === undefined) {
    return res.status(404).json({ message: "Data not found" });
  }

  return res.status(500).json({ message: "Internal server error" });
};

export const handleClientError = (res, status, message) => {
  return res.status(status).json({ message });
};

export const sendResponse = (res, status, message, data) => {
  return res.status(status).json({ status, message, data });
};
