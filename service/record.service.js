const fetch = require("node-fetch");
const db = require("../db/db");
const OperationService = require("./operation.service");

const getRandomString = async () => {
  try {
    const response = await fetch(
      "https://www.random.org/strings/?num=1&len=30&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new"
    );
    return await response.text();
  } catch (error) {
    throw error;
  }
};

const saveRecord = async (record) => {
  try {
    let result = await db("records")
      .returning([
        "id",
        "operation_id",
        "user_id",
        "amount",
        "user_balance",
        "operation_response",
        "created_at",
        "updated_at",
      ])
      .insert(record);
    if (typeof result[0] === "number") {
      result = await db
        .select()
        .from("records")
        .where("id", result[0])
        .andWhere("status", true);
      return result[0];
    } else {
      return result[0];
    }
  } catch (error) {
    return { error };
  }
};

const calculateOperationResponse = async (
  operation_id,
  user_balance,
  amount
) => {
  let operation_response;
  const operation = await OperationService.getOperation(operation_id);

  const { type, cost } = operation;

  if (type === "random_string") {
    operation_response = await getRandomString();
  } else {
    operation_response = `${type} of ${amount}`;
  }

  return {
    operation_response,
    new_user_balance: user_balance - cost,
  };
};

const getRecords = async (user_id, pageNumber, pageSize, search) => {
  const offset = (pageNumber - 1) * pageSize;
  try {
    const result = await db
      .select()
      .from("records")
      .where("user_id", user_id)
      .andWhere("status", true)
      .modify((queryBuilder) => {
        if (search) {
          queryBuilder.whereLike("operation_response", `%${search}%`);
        }
      })
      .paginate({
        perPage: pageSize,
        currentPage: pageNumber,
        isLengthAware: true,
      });

    const { total, lastPage } = result.pagination;
    return { records: result.data, total, pages: lastPage };
  } catch (error) {
    throw error;
  }
};

const deletRecord = async (id) => {
  try {
    await db("records").where("id", id).update("status", false);
  } catch (error) {
    throw error;
  }
};

const RecordService = {
  saveRecord,
  calculateOperationResponse,
  getRecords,
  deletRecord,
};

module.exports = RecordService;
