const Team = require ("../models/team.js")
const { NotFoundError, ValidationError } = require ("../utils/errors.js")

module.exports = TeamService = {
  async createTeam(teamData, userId) {
    const team = new Team({
      ...teamData,
      owner: userId,
      members: [userId],
    })
    await team.save()
    return team
  },

  async getTeam(teamId) {
    const team = await Team.findById(teamId).populate("members", "name email")
    if (!team) {
      throw new NotFoundError("Team not found")
    }
    return team
  },

  async updateTeam(teamId, updateData) {
    const team = await Team.findByIdAndUpdate(teamId, updateData, { new: true })
    if (!team) {
      throw new NotFoundError("Team not found")
    }
    return team
  },

  async deleteTeam(teamId) {
    const result = await Team.findByIdAndDelete(teamId)
    if (!result) {
      throw new NotFoundError("Team not found")
    }
  },

  async addMember(teamId, userId) {
    const team = await Team.findById(teamId)
    if (!team) {
      throw new NotFoundError("Team not found")
    }
    if (team.members.includes(userId)) {
      throw new ValidationError("User is already a member of this team")
    }
    team.members.push(userId)
    await team.save()
    return team
  },

  async removeMember(teamId, userId) {
    const team = await Team.findById(teamId)
    if (!team) {
      throw new NotFoundError("Team not found")
    }
    team.members = team.members.filter((member) => member.toString() !== userId)
    await team.save()
    return team
  },

  async listTeams(userId) {
    return Team.find({ $or: [{ owner: userId }, { members: userId }] })
  },
}

