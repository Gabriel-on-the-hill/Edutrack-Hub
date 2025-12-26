// lib/audit.js
// Utility for creating audit log entries

import prisma from './db';

/**
 * Create an audit log entry
 * @param {Object} params
 * @param {string} params.actorId - User ID performing the action
 * @param {string} params.action - Action type (CREATE, UPDATE, DELETE, etc.)
 * @param {string} params.entity - Entity type (User, Class, Enrollment, etc.)
 * @param {string} params.entityId - ID of the affected entity
 * @param {Object} [params.changes] - Object containing the changes made
 * @param {Object} [params.metadata] - Additional context
 */
export async function createAuditLog({
  actorId,
  action,
  entity,
  entityId,
  changes = null,
  metadata = null,
}) {
  try {
    await prisma.auditLog.create({
      data: {
        actorId,
        action,
        entity,
        entityId,
        changes: changes ? JSON.stringify(changes) : null,
        metadata: metadata ? JSON.stringify(metadata) : null,
      },
    });
  } catch (error) {
    // Don't let audit logging failures break the main operation
    console.error('Audit log failed:', error);
  }
}

/**
 * Audit action types
 */
export const AuditAction = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  ENROLL: 'ENROLL',
  ATTEND: 'ATTEND',
  COMPLETE: 'COMPLETE',
  CANCEL: 'CANCEL',
};

/**
 * Entity types for audit logging
 */
export const AuditEntity = {
  USER: 'User',
  CLASS: 'Class',
  ENROLLMENT: 'Enrollment',
  ATTENDANCE: 'Attendance',
  PAYMENT: 'Payment',
  RESOURCE: 'Resource',
};

export default { createAuditLog, AuditAction, AuditEntity };
