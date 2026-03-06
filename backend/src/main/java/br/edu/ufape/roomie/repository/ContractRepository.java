package br.edu.ufape.roomie.repository;

import br.edu.ufape.roomie.enums.ContractStatus;
import br.edu.ufape.roomie.model.Contract;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ContractRepository extends JpaRepository<Contract, Long> {
    Optional<Contract> findByPropertyIdAndStudentIdAndStatus(Long propertyId, Long studentId, ContractStatus status);
    List<Contract> findByChatId(Long chatId);
}

