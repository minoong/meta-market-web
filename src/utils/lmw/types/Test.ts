import Equals from '~/utils/lmw/types/Equals'

export type Pass = 1

/**
 * Test should fail
 */
export type Fail = 0

/**
 * Check or test the validity of a type
 */
export declare function check<Type, Expect, Outcome extends Pass | Fail>(
 debug?: Type,
): Equals<Equals<Type, Expect>, Outcome>

/**
 * Validates a batch of [[check]]
 * @param checks a batch of [[check]]
 */
export declare function checks(checks: Pass[]): void
