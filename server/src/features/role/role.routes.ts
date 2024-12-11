import { Router } from 'express';
import { roleController } from './role.controller';
import { validateRequest } from '../../middlewares/validator';
import { RoleDtoSchema } from './dto/role.dto.schema';

const roleRouter = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     RoleType:
 *       type: string
 *       enum: [employee, employer]
 *       example: employee
 */

/**
 * @openapi
 * /api/roles:
 *   get:
 *     tags: [Roles]
 *     summary: Get all available roles
 *     responses:
 *       200:
 *         description: Array of available roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RoleType'
 *               example: ["employee", "employer"]
 *       500:
 *         description: Server error
 */
roleRouter.get('/', roleController.getRoles);

/**
 * @openapi
 * /api/roles/assign-role:
 *   post:
 *     tags: [Roles]
 *     summary: Assign role to user
 *     description: Assigns either 'employee' or 'employer' role to a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - roleName
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *               roleName:
 *                 $ref: '#/components/schemas/RoleType'
 *     responses:
 *       200:
 *         description: Role successfully assigned
 *       400:
 *         description: Invalid role or validation error
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
roleRouter.post(
  '/assign-role',
  validateRequest(RoleDtoSchema),
  roleController.assignRole
);

export default roleRouter;
