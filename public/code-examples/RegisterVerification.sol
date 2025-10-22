// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Register Verification
 * @notice Add new solver verification to VPNL registry
 * @dev From VPNLRegistry.sol - deployed on Arbitrum Sepolia
 * Uses cryptographic commitments (zero PII on-chain)
 */
contract VPNLRegistryExample {
    
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
    address public verifier;
    
    event Verified(
        address indexed solver,
        bytes32 commitmentHash,
        uint256 verifiedAt,
        uint256 expiresAt
    );
    
    modifier onlyVerifier() {
        require(msg.sender == verifier, "Only verifier can call");
        _;
    }
    
    /**
     * @notice Register a new verification
     * @param solver Solver address
     * @param commitmentHash Cryptographic commitment hash
     * @param expiresAt Expiration timestamp
     */
    function verify(
        address solver,
        bytes32 commitmentHash,
        uint256 expiresAt
    ) external onlyVerifier {
        require(solver != address(0), "Invalid solver address");
        require(commitmentHash != bytes32(0), "Invalid commitment");
        require(expiresAt > block.timestamp, "Invalid expiration");
        
        verifications[solver] = Verification({
            commitmentHash: commitmentHash,
            verifiedAt: block.timestamp,
            expiresAt: expiresAt,
            active: true,
            revoked: false,
            revokeReason: ""
        });
        
        emit Verified(solver, commitmentHash, block.timestamp, expiresAt);
    }
    
    /**
     * @notice Example: Generate commitment hash off-chain
     * @dev In practice, this is done off-chain to preserve privacy
     * commitment = keccak256(abi.encodePacked(score, salt, metadata))
     */
    function exampleCommitment() public pure returns (bytes32) {
        uint256 score = 85; // 0.85 reputation score
        bytes32 salt = keccak256("random_salt");
        string memory metadata = "context_data";
        
        return keccak256(abi.encodePacked(score, salt, metadata));
    }
}
