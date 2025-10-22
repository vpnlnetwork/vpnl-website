// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// VPNL Registry Interface
interface IVPNLRegistry {
    function isVerified(address solver) external view returns (bool);
}

/**
 * @title Risk-Adjusted Collateral
 * @notice Scale collateral based on VPNL verification
 * @dev Example from VPNL README - real integration pattern
 * Verified solvers: 15% collateral | Unverified: 100% collateral
 */
contract RiskAdjustedCollateralPolicy {
    IVPNLRegistry public vpnlRegistry;
    
    // Collateral percentages (basis points: 10000 = 100%)
    uint256 public constant VERIFIED_COLLATERAL_BPS = 1500;   // 15%
    uint256 public constant UNVERIFIED_COLLATERAL_BPS = 10000; // 100%
    
    constructor(address _registry) {
        vpnlRegistry = IVPNLRegistry(_registry);
    }
    
    /**
     * @notice Calculate required collateral for intent
     * @param solver Solver address
     * @param intentValue Value of the intent
     * @return collateralRequired Amount of collateral needed
     */
    function calculateCollateral(
        address solver, 
        uint256 intentValue
    ) public view returns (uint256 collateralRequired) {
        if (!vpnlRegistry.isVerified(solver)) {
            // Unverified: 100% collateral
            return intentValue;
        }
        
        // Verified: 15% collateral (protocol-defined policy)
        return (intentValue * VERIFIED_COLLATERAL_BPS) / 10000;
    }
    
    /**
     * @notice Example: Process intent with risk-adjusted collateral
     * @param solver Solver address
     * @param intentValue Value to transfer
     */
    function processIntent(
        address solver,
        uint256 intentValue
    ) external payable {
        uint256 required = calculateCollateral(solver, intentValue);
        require(msg.value >= required, "Insufficient collateral");
        
        // Process intent logic here...
        // Verified solvers need less capital locked
    }
    
    /**
     * @notice Calculate capital efficiency gain
     * @param solver Solver address
     * @param intentValue Value of intent
     * @return savingsAmount Amount saved vs unverified
     */
    function calculateSavings(
        address solver,
        uint256 intentValue
    ) public view returns (uint256 savingsAmount) {
        uint256 withVerification = calculateCollateral(solver, intentValue);
        uint256 withoutVerification = intentValue;
        
        if (vpnlRegistry.isVerified(solver)) {
            return withoutVerification - withVerification; // 85% saved
        }
        return 0;
    }
}
