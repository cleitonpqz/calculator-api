const db = require("../db/db");
const RecordService = require("../service/record.service");

exports.createRecord = async (req, res) => {
  try {
    const user_id = req.userId;
    const { operation_id, amount, user_balance } = req.body;
    const { operation_response, new_user_balance } =
      await RecordService.calculateOperationResponse(
        operation_id,
        user_balance,
        amount
      );

    if (new_user_balance < 0) {
      res
        .status(402)
        .send({ message: "Account does not have sufficient balance" });
      return;
    }

    const record = {
      user_id,
      operation_id,
      amount,
      user_balance: new_user_balance,
      operation_response,
      status: true,
    };

    res.status(201).send(await RecordService.saveRecord(record));
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

exports.getRecords = async (req, res) => {
  try {
    const pageNumber = req.query.page || 1;
    const pageSize = req.query.per_page || 10;
    const search = req.query.search || "";

    const user_id = req.userId;

    const { records, total, pages } = await RecordService.getRecords(
      user_id,
      pageNumber,
      pageSize,
      search
    );

    res.send({
      records,
      total,
      page: pageNumber,
      per_page: parseInt(pageSize),
      pages,
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

exports.deleteRecord = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send("Id must be provided");
  }
  try {
    await RecordService.deletRecord(id);
    res.send("Record removed successfully");
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
