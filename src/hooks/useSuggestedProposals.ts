import { useState, useCallback, useMemo } from 'react';
import { Proposal, SuggestedProposalState } from '../types';

export interface UseSuggestedProposalsOptions {
  initialProposals?: Proposal[];
  onInterested?: (proposalId: string) => void | Promise<void>;
  onRemove?: (proposalId: string) => void | Promise<void>;
  onOwnProposal?: (proposal: Proposal) => void | Promise<void>;
}

export interface UseSuggestedProposalsReturn {
  // State
  state: SuggestedProposalState;
  currentProposal: Proposal | null;
  isVisible: boolean;
  proposalCounter: number;
  totalProposals: number;

  // Actions
  show: () => void;
  hide: () => void;
  toggle: () => void;
  goToNext: () => void;
  goToPrevious: () => void;
  goToProposal: (index: number) => void;
  handleInterested: (proposalId: string) => void;
  handleRemove: (proposalId: string) => void;
  setProposals: (proposals: Proposal[]) => void;

  // Navigation flags
  canGoNext: boolean;
  canGoPrev: boolean;
}

export const useSuggestedProposals = (
  options: UseSuggestedProposalsOptions = {}
): UseSuggestedProposalsReturn => {
  const { initialProposals = [], onInterested, onRemove, onOwnProposal } = options;

  const [proposals, setProposals] = useState<Proposal[]>(initialProposals);
  const [proposalCounter, setProposalCounter] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);

  // Filter proposals (exclude those in notInterested list for current user)
  const filteredProposals = useMemo(() => {
    return proposals.filter((p) => p.status === 'suggested' && !p.deleted);
  }, [proposals]);

  const totalProposals = filteredProposals.length;

  const currentProposal = useMemo(() => {
    if (proposalCounter > 0 && proposalCounter <= filteredProposals.length) {
      return filteredProposals[proposalCounter - 1];
    }
    return null;
  }, [filteredProposals, proposalCounter]);

  const canGoNext = proposalCounter < totalProposals;
  const canGoPrev = proposalCounter > 1;

  // Actions
  const show = useCallback(() => {
    setIsVisible(true);
    setDetailsVisible(true);
  }, []);

  const hide = useCallback(() => {
    setIsVisible(false);
    setDetailsVisible(false);
  }, []);

  const toggle = useCallback(() => {
    setIsVisible((prev) => !prev);
    setDetailsVisible((prev) => !prev);
  }, []);

  const goToNext = useCallback(() => {
    if (proposalCounter < totalProposals) {
      setProposalCounter((prev) => prev + 1);
    } else {
      // Wrap around to first
      setProposalCounter(1);
    }
  }, [proposalCounter, totalProposals]);

  const goToPrevious = useCallback(() => {
    if (proposalCounter > 1) {
      setProposalCounter((prev) => prev - 1);
    } else {
      // Wrap around to last
      setProposalCounter(totalProposals);
    }
  }, [proposalCounter, totalProposals]);

  const goToProposal = useCallback(
    (index: number) => {
      if (index >= 1 && index <= totalProposals) {
        setProposalCounter(index);
      }
    },
    [totalProposals]
  );

  const handleInterested = useCallback(
    async (proposalId: string) => {
      if (onInterested) {
        await onInterested(proposalId);
      }

      // Mark as viewed
      setProposals((prev) =>
        prev.map((p) =>
          p.id === proposalId ? { ...p, viewedProposedProposal: true } : p
        )
      );

      // Find proposal and trigger onOwnProposal if provided
      const proposal = filteredProposals.find((p) => p.id === proposalId);
      if (proposal && onOwnProposal) {
        await onOwnProposal(proposal);
      }
    },
    [onInterested, onOwnProposal, filteredProposals]
  );

  const handleRemove = useCallback(
    async (proposalId: string) => {
      if (onRemove) {
        await onRemove(proposalId);
      }

      // Remove from list (or mark as deleted)
      setProposals((prev) =>
        prev.map((p) => (p.id === proposalId ? { ...p, deleted: true } : p))
      );

      // Navigate to next or hide if no more proposals
      if (totalProposals <= 1) {
        hide();
        setProposalCounter(1);
      } else if (proposalCounter >= totalProposals) {
        setProposalCounter((prev) => prev - 1);
      }
    },
    [onRemove, totalProposals, proposalCounter, hide]
  );

  const state: SuggestedProposalState = {
    proposalCounter,
    isVisible,
    detailsVisible,
    interestSection: 'start',
    filteredProposals,
    currentProposal
  };

  return {
    state,
    currentProposal,
    isVisible,
    proposalCounter,
    totalProposals,
    show,
    hide,
    toggle,
    goToNext,
    goToPrevious,
    goToProposal,
    handleInterested,
    handleRemove,
    setProposals,
    canGoNext,
    canGoPrev
  };
};

export default useSuggestedProposals;
