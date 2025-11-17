import { describe, it } from 'mocha';
import { expect } from 'chai';
import { isValidGuid,  isValidIpv6 } from './validators';

// test the isValidGuid function
describe('isValidGuid', () => {
    it('should return true for a valid GUID', () => {
        const validGuid = '123e4567-e89b-12d3-a456-426614174000';
        expect(isValidGuid(validGuid)).to.be.true;
    });
    it('should return false for an invalid GUID', () => {
        const invalidGuid = '123e4567-e89b-12d3-a456-42661417400Z';
        expect(isValidGuid(invalidGuid)).to.be.false;
    });

});
describe('isValidIpv6', () => {
    it('should return true for a valid IPv6 address', () => {
        const validIpv6 = '2001:0db8:85a3:0000:0000:8a2e:0370:7334';
        expect(isValidIpv6(validIpv6)).to.be.true;
    });
    it('should return false for an invalid IPv6 address', () => {
        const invalidIpv6 = '2001:0db8:85a3:0000:0000:8a2e:0370:733G';
        expect(isValidIpv6(invalidIpv6)).to.be.false;
    });
});