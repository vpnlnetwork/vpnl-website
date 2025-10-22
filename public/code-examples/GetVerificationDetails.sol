// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Get Verification Details
 * @notice Retrieve complete solver verification data
 * @dev From VPNLRegistry.sol - query expiry, revocation status
 */
contract VerificationDetailsExample {
    
    /// @notice Verification record structure
    struct Verification {
        bytes32 commitmentHash;    // H(score || salt || metadata)
        uint256 verifiedAt;        // Timestamp of verification
        uint256 expiresAt;         // Expiration timestamp
        bool active;               // Active status
        bool revoked;              // Revocation status
        string revokeReason;       // Reason for revocation (if any)
    }
    
    mapping(address => Verification) public verifications;
    
    /**
     * @notice Get complete verification details
     * @param solver Solver address
     * @return Verification struct with all data
     */
    function getVerification(address solver)
        external
        view
        returns (Verification memory)
    {
        return verifications[solver];
    }
    
    /**
     * @notice Check if solver is currently verified
     * @param solver Solver address
     * @return bool Active verification status
     */
    function isVerified(address solver) external view returns (bool) {
        Verification memory v = verifications[solver];
        return v.active &&
               !v.revoked &&
               block.timestamp < v.expiresAt;
    }
    
    /**
     * @notice Get time until verification expires
     * @param solver Solver address
     * @return timeRemaining Seconds until expiry (0 if expired/invalid)
     */
    function getTimeUntilExpiry(address solver) 
        public 
        view 
        returns (uint256 timeRemaining) 
    {
        Verification memory v = verifications[solver];
        
        if (!v.active || v.revoked || block.timestamp >= v.expiresAt) {
            return 0;
        }
        
        return v.expiresAt - block.timestamp;
    }
    
    /**
     * @notice Batch query verification status
     * @param solvers Array of solver addresses
     * @return statuses Array of verification statuses
     */
    function batchGetStatus(address[] memory solvers)
        external
        view
        returns (bool[] memory statuses)
    {
        statuses = new bool[](solvers.length);
        
        for (uint256 i = 0; i < solvers.length; i++) {
            Verification memory v = verifications[solvers[i]];
            statuses[i] = v.active &&
                         !v.revoked &&
                         block.timestamp < v.expiresAt;
        }
        
        return statuses;
    }
}
