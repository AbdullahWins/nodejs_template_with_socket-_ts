//group chat module

const { Timekoto } = require("timekoto");
const GroupChatMessage = require("../models/Chat/GroupChatModel");
const Group = require("../models/Group/GroupModel");
const { logger } = require("../services/logHandlers/HandleWinston");

interface GroupMessageData {
  senderId: string;
  senderImage: string;
  groupId: string;
  message: string;
  attachment: string;
}

async function handleGroupMessage(io: any, data: GroupMessageData) {
  try {
    const { senderId, senderImage, groupId, message, attachment } = data;
    const processedData = {
      sender: senderId,
      senderImage: senderImage,
      group: groupId,
      message: message,
      attachment: attachment,
    };

    // Get users list from the group
    const groupUsers = await Group.findById(groupId);
    if (!groupUsers) {
      throw new Error("Group not found");
    }
    if (!groupUsers.members) {
      throw new Error("Group members not found");
    }

    groupUsers.members.forEach((id: string) => {
      io.to(id).emit("group", {
        ...processedData,
        createdAt: Timekoto(),
      });
    });

    // Save the message to the database
    await GroupChatMessage.addGroupChatMessage(processedData);

    // Log the message
    logger.log({
      level: "debug",
      message: `GROUP: Message sent from "${senderId}" to the group "${groupId}": \n message: "${message}" \n attachment: "${attachment}"`,
    });

    // io.to(groupId).emit("group", newMessage);
  } catch (error) {
    console.error("Error saving group chat message:", error);
  }
}

module.exports = {
  handleGroupMessage,
};
